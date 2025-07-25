import React from 'react'
import { Link } from 'react-router'
import { Box, Button } from '@mui/material'

import { IUserPublic } from '@/common/models/user'
import { H3, H4, Paragraph } from '@/components/data-display'

interface IBlogAuthorProps {
    author: IUserPublic
}

const BlogAuthor = ({ author }: IBlogAuthorProps) => (
    <Box
        data-testid="blog-author"
        sx={{
            mb: 5,
        }}
    >
        <H3 data-testid="blog-author-title">ABOUT AUTHOR</H3>
        <H4>
            {author.firstName} {author.lastName}
        </H4>
        <Paragraph sx={{ mb: 1 }}>{author.description}</Paragraph>
        <Link
            to={`/blog-posts?createdBy=${author.firstName} ${author.lastName}`}
            style={{ textDecoration: 'none' }}
        >
            <Button variant="text" sx={{ pl: 0 }}>
                View blogs ...
            </Button>
        </Link>
    </Box>
)

export default BlogAuthor
