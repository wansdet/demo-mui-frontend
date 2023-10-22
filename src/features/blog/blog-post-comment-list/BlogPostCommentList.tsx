import * as React from 'react'
import {
    Divider,
    List,
    ListItem,
    ListItemText,
    Rating,
    Typography,
} from '@mui/material'

import { IBlogPostComment } from '@/common/models/blog'
import { H4, Paragraph } from '@/components/data-display'
import { dateFormat } from '@/utils/date'

interface IBlogPostCommentListProps {
    comments: IBlogPostComment[]
}

const BlogPostCommentList = ({ comments }: IBlogPostCommentListProps) => {
    const publishedComments = comments.filter(
        (comment) => comment.status == 'published'
    )

    return (
        <List
            sx={{
                width: '100%',
            }}
        >
            {publishedComments.map((comment: IBlogPostComment) => (
                <React.Fragment key={comment.blogPostCommentId}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <H4>{comment.createdBy}</H4>
                                </React.Fragment>
                            }
                            secondary={
                                <React.Fragment>
                                    <Typography variant={'subtitle1'}>
                                        {dateFormat(
                                            comment.createdAt,
                                            'MMM D, YYYY'
                                        )}
                                    </Typography>
                                    <Rating
                                        value={comment.rating / 2}
                                        readOnly
                                    />
                                    <Paragraph>{comment.comment}</Paragraph>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider component="li" variant="middle" />
                </React.Fragment>
            ))}
        </List>
    )
}

export default BlogPostCommentList
