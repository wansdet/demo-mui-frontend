import React, { useContext, useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
// import { BarChart } from '@mui/x-charts'

import { useApiGet } from '@/core/api'
import { AdminFooter } from '@/core/layout'
import {
    ApplicationContext,
    API_URL_BLOG_POSTS_MONTHLY_CATEGORIES,
    APP_NAME,
} from '@/core/application'
import { IMonthlyBlogPostCategory } from '@/common/models/blog'
import { blogCategories } from '@/common/models/blog'
import { IBarChartSeriesData } from '@/common/models/chart'
import { H1, Paragraph } from '@/components/data-display'
import { YearSelection } from '@/components/utils'

const BlogPostsMonthlyCategories = () => {
    const [monthlyBlogPosts, setMonthlyBlogPosts] = useState<
        IMonthlyBlogPostCategory[]
    >([])
    const [years, setYears] = useState<number[]>([])
    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear()
    )
    const [xAxis, setXAxis] = useState<string[]>([])
    const [series, setSeries] = useState<IBarChartSeriesData[]>([])
    const title = 'Monthly Blog Posts by Categories'

    document.title = `${title} | Admin | ${APP_NAME}`

    const {
        data: fetchedMonthlyBlogPosts,
        loading: getLoading,
        error: getError,
    } = useApiGet<any[]>(API_URL_BLOG_POSTS_MONTHLY_CATEGORIES)

    const { showLoading, hideLoading } = useContext(ApplicationContext)

    useEffect(() => {
        if (fetchedMonthlyBlogPosts) {
            setMonthlyBlogPosts(fetchedMonthlyBlogPosts)

            // Get unique years
            const uniqueYears = fetchedMonthlyBlogPosts
                .map((blogPost: IMonthlyBlogPostCategory) => blogPost.year)
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
    }, [getLoading])

    useEffect(() => {
        const selectedYearData = monthlyBlogPosts.filter(
            (blogPost: IMonthlyBlogPostCategory) =>
                blogPost.year === selectedYear
        )

        const xAxisData: string[] = []

        const seriesData: IBarChartSeriesData[] = []
        blogCategories.forEach((blogCategoryOption) => {
            seriesData.push({
                data: [],
                label: blogCategoryOption.label,
                id: blogCategoryOption.label,
            })
        })

        selectedYearData.forEach((monthData: any) => {
            xAxisData.push(
                new Date(0, monthData.month).toLocaleString('default', {
                    month: 'short',
                })
            )
            monthData.blogPostCategories.forEach((blogPostCategory: any) => {
                seriesData
                    .find(
                        (series) =>
                            series.id === blogPostCategory.blogCategoryName
                    )
                    ?.data.push(blogPostCategory.blogPostCount)
            })
        })

        // console.log(xAxisData)
        // console.log(seriesData)

        setXAxis(xAxisData)
        setSeries(seriesData)
    }, [selectedYear, monthlyBlogPosts])

    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedYear(Number(event.target.value))
    }

    return (
        <React.Fragment>
            <Container
                data-testid="blog-posts-monthly-categories-content"
                maxWidth="lg"
                sx={{ pt: 8, pb: 8 }}
            >
                <H1 variant="h3" data-testid="page-heading">
                    Monthly Blog Posts by Categories
                </H1>
                <Paragraph>
                    TODO: Replace MUI x-charts with another library to avoid
                    Popper issue.
                </Paragraph>
                <YearSelection
                    years={years}
                    selectedYear={selectedYear}
                    onChange={handleYearChange}
                />
                {/*{xAxis.length > 0 && series.length > 0 && (
                    <Box
                        data-testid="blog-posts-monthly-categories-chart"
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
                )}*/}
            </Container>
            <AdminFooter />
        </React.Fragment>
    )
}

export default BlogPostsMonthlyCategories
