import React, { useContext, useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import { BarChart } from '@mui/x-charts'

import { useApiGet } from '@/core/api'
import { AdminFooter } from '@/core/layout'
import {
    ApplicationContext,
    API_URL_BLOG_POSTS_MONTHLY_AUTHORS,
    APP_NAME,
    API_URL_USERS,
} from '@/core/application'
import { IMonthlyBlogPostAuthor } from '@/common/models/blog'
import { IBarChartSeriesData } from '@/common/models/chart'
import { H1 } from '@/components/data-display'
import { YearSelection } from '@/components/utils'

const BlogPostsMonthlyAuthors = () => {
    const [monthlyBlogPosts, setMonthlyBlogPosts] = useState<
        IMonthlyBlogPostAuthor[]
    >([])
    const [blogAuthors, setBlogAuthors] = useState<any[]>([])
    const [years, setYears] = useState<number[]>([])
    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear()
    )
    const [xAxis, setXAxis] = useState<string[]>([])
    const [series, setSeries] = useState<IBarChartSeriesData[]>([])
    const title = 'Monthly Blog Posts by Authors'

    document.title = `${title} | Admin | ${APP_NAME}`

    const {
        data: fetchedMonthlyBlogPosts,
        loading: getLoading,
        error: getError,
    } = useApiGet<any[]>(API_URL_BLOG_POSTS_MONTHLY_AUTHORS)

    const {
        data: fetchedBlogAuthors,
        loading: getAuthorLoading,
        error: getAuthorError,
    } = useApiGet<any[]>(`${API_URL_USERS}/blogs/authors`)

    const { showLoading, hideLoading } = useContext(ApplicationContext)

    useEffect(() => {
        if (fetchedBlogAuthors) {
            setBlogAuthors(fetchedBlogAuthors)
        }
    }, [fetchedBlogAuthors])

    useEffect(() => {
        if (fetchedMonthlyBlogPosts) {
            setMonthlyBlogPosts(fetchedMonthlyBlogPosts)

            // Get unique years
            const uniqueYears = fetchedMonthlyBlogPosts
                .map((blogPost: IMonthlyBlogPostAuthor) => blogPost.year)
                .filter((value: number, index: number, self: number[]) => {
                    return self.indexOf(value) === index
                })

            setYears(uniqueYears)
        }
    }, [fetchedMonthlyBlogPosts])

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading, hideLoading, showLoading])

    useEffect(() => {
        const selectedYearData = monthlyBlogPosts.filter(
            (blogPost: IMonthlyBlogPostAuthor) => blogPost.year === selectedYear
        )

        const xAxisData: string[] = []

        const seriesData: IBarChartSeriesData[] = []
        blogAuthors.forEach((blogAuthor) => {
            seriesData.push({
                data: [],
                label: `${blogAuthor.firstName  } ${  blogAuthor.lastName}`,
                id: `${blogAuthor.firstName  } ${  blogAuthor.lastName}`,
            })
        })

        selectedYearData.forEach((monthData: any) => {
            xAxisData.push(
                new Date(0, monthData.month).toLocaleString('default', {
                    month: 'short',
                })
            )

            monthData.blogPostAuthors.forEach((blogPostAuthor: any) => {
                seriesData
                    .find((series) => series.id === blogPostAuthor.author)
                    ?.data.push(blogPostAuthor.blogPostCount)
            })
        })

        // console.log(xAxisData)
        // console.log(seriesData)

        setXAxis(xAxisData)
        setSeries(seriesData)
    }, [selectedYear, monthlyBlogPosts, blogAuthors])

    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedYear(Number(event.target.value))
    }

    return (
        <>
            <Container
                data-testid="monthly-blog-posts-authors-content"
                maxWidth="lg"
                sx={{ pt: 8, pb: 8 }}
            >
                <H1 variant="h3" className="page-heading" data-testid="monthly-blog-posts-authors-heading">
                    Monthly Blog Posts by Authors
                </H1>
                <YearSelection
                    years={years}
                    selectedYear={selectedYear}
                    onChange={handleYearChange}
                />
                {xAxis.length > 0 && series.length > 0 && (
                    <Box
                        data-testid="blog-posts-monthly-authors-chart"
                        sx={{
                            backgroundColor: 'background.paper',
                            p: 8,
                            width: '100%',
                            height: '50vh',
                        }}
                    >
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: xAxis }]}
                            series={series}
                            sx={{ width: '100%', height: '100%' }}
                        />
                    </Box>
                )}
            </Container>
            <AdminFooter />
        </>
    )
}

export default BlogPostsMonthlyAuthors
