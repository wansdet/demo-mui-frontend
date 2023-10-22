import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, List, ListItem } from '@mui/material'

import { API_URL_BLOG_AUTHORS } from '@/core/application'
import { useApiGet } from '@/core/api'
import { IUserPublic } from '@/common/models/user'
import { H3 } from '@/components/data-display'

const BlogAuthorsList = () => {
    const [blogAuthors, setBlogAuthors] = useState<IUserPublic[]>([])

    const {
        data: fetchedBlogAuthors,
        loading: getLoading,
        error: getError,
    } = useApiGet<any[]>(API_URL_BLOG_AUTHORS, false)

    useEffect(() => {
        if (fetchedBlogAuthors) {
            setBlogAuthors(fetchedBlogAuthors)
        }
    }, [fetchedBlogAuthors])

    return (
        <React.Fragment>
            <H3 data-testid="blog-authors-heading">BLOG AUTHORS</H3>
            <List
                data-testid="blog-authors-list"
                sx={{
                    width: '100%',
                    mb: 5,
                }}
            >
                {blogAuthors.map((blogAuthor) => (
                    <ListItem key={blogAuthor.userId} sx={{ py: 0 }}>
                        <Link
                            data-test="blog-author-link"
                            to={`/blog-posts?createdBy=${blogAuthor.firstName} ${blogAuthor.lastName}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Button
                                data-test="blog-author-button"
                                variant="text"
                                sx={{ pl: 0 }}
                            >
                                {blogAuthor.firstName} {blogAuthor.lastName}
                            </Button>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    )
}

export default BlogAuthorsList
