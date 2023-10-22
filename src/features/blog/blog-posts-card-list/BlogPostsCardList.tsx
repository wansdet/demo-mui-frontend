import React from 'react'
import { Link } from 'react-router-dom'
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import TopicIcon from '@mui/icons-material/Topic'

import { BASE_IMAGE_ASSETS_URL, PATH_BLOG_POST } from '@/core/application'
import { limitWords } from '@/utils/string'
import { IBlogPost } from '@/common/models/blog'
import { dateFormat } from '@/utils/date'
import { H3 } from '@/components/data-display'

interface IBlogPostsCardListProps {
    blogPosts: IBlogPost[]
}

const BlogPostsCardList = ({ blogPosts }: IBlogPostsCardListProps) => {
    return (
        <React.Fragment>
            {blogPosts.map((blogPost: IBlogPost) => (
                <CardActionArea
                    data-test="blog-posts-card-action-area"
                    component={Link}
                    to={`${PATH_BLOG_POST}/${blogPost.blogPostId}`}
                    key={blogPost.blogPostId}
                >
                    <Card variant={'outlined'} sx={{ mb: 10 }}>
                        <CardMedia
                            component="img"
                            sx={{
                                width: 800,
                                height: 300,
                                display: {
                                    xs: 'none',
                                    sm: 'block',
                                },
                            }}
                            image={`${BASE_IMAGE_ASSETS_URL}/200x150?text=Blog Post Image`}
                            alt=""
                        />
                        <CardContent data-test="blog-post-card-content">
                            <H3>{blogPost.title}</H3>
                            <Typography
                                data-test="blog-post-card-content-subtitle"
                                variant="subtitle1"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <CalendarTodayIcon
                                    fontSize="small"
                                    color="primary"
                                    sx={{ mr: 1 }}
                                />
                                {dateFormat(blogPost.createdAt, 'MMM D, YYYY')}
                                <ArticleIcon
                                    fontSize="small"
                                    color="primary"
                                    sx={{ ml: 1, mr: 1 }}
                                />
                                {blogPost.createdBy}
                                <TopicIcon
                                    fontSize="small"
                                    color="primary"
                                    sx={{ ml: 1, mr: 1 }}
                                />
                                {blogPost.blogCategory.blogCategoryName}
                            </Typography>
                            <Typography
                                data-test="blog-post-card-content-description"
                                variant="body1"
                                color="text.secondary"
                            >
                                {limitWords(blogPost?.content || '', 50)}
                            </Typography>
                            <Typography
                                data-test="blog-post-card-content-read-more"
                                variant="subtitle1"
                                color="primary"
                            >
                                Read more...
                            </Typography>
                        </CardContent>
                    </Card>
                </CardActionArea>
            ))}
        </React.Fragment>
    )
}

export default BlogPostsCardList
