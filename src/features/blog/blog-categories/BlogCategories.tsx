import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button } from '@mui/material'

import { ApplicationContext, API_URL_BLOG_CATEGORIES } from '@/core/application'
import { useApiGet } from '@/core/api'
import { IBlogCategory } from '@/common/models/blog'
import { H1, Heading, Section, Paragraph, H3 } from '@/components/data-display'

const BlogCategories = () => {
    const [blogCategories, setBlogPostCategories] = useState<IBlogCategory[]>(
        []
    )

    const {
        data: fetchedBlogPostCategories,
        loading: getLoading,
        error: getError,
    } = useApiGet<any[]>(API_URL_BLOG_CATEGORIES, false)

    const { showLoading, hideLoading } = useContext(ApplicationContext)

    useEffect(() => {
        if (fetchedBlogPostCategories) {
            setBlogPostCategories(fetchedBlogPostCategories)
        }
    }, [fetchedBlogPostCategories])

    return (
        <React.Fragment>
            <Box
                data-testid="blog-categories"
                sx={{
                    mb: 6,
                }}
            >
                <H3 data-testid="blog-categories-heading">BLOG CATEGORIES</H3>
                {blogCategories.map((category: IBlogCategory) => (
                    <Link
                        data-testid={`blog-categories-${category.blogCategoryCode.toLowerCase()}-link`}
                        key={category.blogCategoryCode}
                        to={`/blog-posts?blogCategory=${category.blogCategoryCode}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <Button
                            data-testid={`blog-categories-${category.blogCategoryCode.toLowerCase()}-button`}
                            key={category.blogCategoryCode}
                            variant="outlined"
                            style={{ margin: '0.5rem' }}
                        >
                            {category.blogCategoryName}
                        </Button>
                    </Link>
                ))}
            </Box>
        </React.Fragment>
    )
}

export default BlogCategories
