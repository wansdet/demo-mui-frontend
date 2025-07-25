import React, { useContext, useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import { PieChart } from '@mui/x-charts'

import { useApiGet } from '@/core/api'
import { AdminFooter } from '@/core/layout'
import {
    ApplicationContext,
    API_URL_BLOG_POSTS_ANNUAL_CATEGORIES,
    APP_NAME,
} from '@/core/application'
import {
    IAnnualBlogPostCategories,
    IBlogPostCategory,
} from '@/common/models/blog'
import { IPieChartSeriesData } from '@/common/models/chart'
import { H1 } from '@/components/data-display'
import { YearSelection } from '@/components/utils'

const BlogPostsAnnualCategories = () => {
    const [annualBlogPosts, setAnnualBlogPosts] = useState<
        IAnnualBlogPostCategories[]
    >([])
    const [years, setYears] = useState<number[]>([])
    const [selectedYear, setSelectedYear] = useState<number>(
        new Date().getFullYear()
    )
    const [series, setSeries] = useState<IPieChartSeriesData[]>([])
    const title = 'Annual Blog Posts by Categories'

    document.title = `${title} | Admin | ${APP_NAME}`

    const {
        data: fetchedAnnualBlogPosts,
        loading: getLoading,
        error: getError,
    } = useApiGet<any[]>(`${API_URL_BLOG_POSTS_ANNUAL_CATEGORIES}`)

    const { showLoading, hideLoading } = useContext(ApplicationContext)

    useEffect(() => {
        if (fetchedAnnualBlogPosts) {
            setAnnualBlogPosts(fetchedAnnualBlogPosts)

            // Get unique years
            const uniqueYears = fetchedAnnualBlogPosts
                .map(
                    (annualBlogPost: IAnnualBlogPostCategories) =>
                        annualBlogPost.year
                )
                .filter((value: number, index: number, self: number[]) => {
                    return self.indexOf(value) === index
                })

            setYears(uniqueYears)
        }
    }, [fetchedAnnualBlogPosts])

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading, hideLoading, showLoading])

    useEffect(() => {
        const selectedYearData = annualBlogPosts.find(
            (annualBlogPost: IAnnualBlogPostCategories) =>
                annualBlogPost.year === selectedYear
        )

        if (selectedYearData) {
            const seriesData: IPieChartSeriesData[] = []
            selectedYearData.blogPostCategories.forEach(
                (blogPost: IBlogPostCategory, index) => {
                    seriesData.push({
                        id: index,
                        value: blogPost.blogPostCount,
                        label: blogPost.blogCategoryName,
                    })
                }
            )

            setSeries(seriesData)
        } else {
            setSeries([])
        }
    }, [selectedYear, annualBlogPosts])

    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedYear(Number(event.target.value))
    }

    return (
        <>
            <Container
                data-testid="annual-blog-posts-categories-content"
                maxWidth="lg"
                sx={{ pt: 8, pb: 8 }}
            >
                <H1 variant="h3" className="page-heading" data-testid="annual-blog-posts-categories-heading">
                    {title}
                </H1>
                <YearSelection
                    years={years}
                    selectedYear={selectedYear}
                    onChange={handleYearChange}
                />
                {series.length > 0 && (
                    <Box
                        data-testid="blog-posts-annual-categories-chart"
                        sx={{
                            backgroundColor: 'background.paper',
                            p: 8,
                            width: '100%',
                            height: '60vh',
                        }}
                    >
                        <PieChart
                            series={[
                                {
                                    data: series,
                                },
                            ]}
                            sx={{ width: '100%', height: '100%' }}
                        />
                    </Box>
                )}
            </Container>
            <AdminFooter />
        </>
    )
}

export default BlogPostsAnnualCategories
