import React, { useState } from 'react'
import { Button, Rating, TextField } from '@mui/material'

// @ts-ignore
const BlogPostCommentCreate = ({ onCommentSubmit }) => {
    const [comment, setComment] = useState<string>('')
    const [rating, setRating] = useState<number | null>(null)

    const handleCommentChange = (event: {
        target: { value: React.SetStateAction<string> }
    }) => {
        setComment(event.target.value)
    }

    const handleRatingChange = (event: any, newRating: number | null) => {
        setRating(newRating) // Update the rating when the user interacts with the Rating component
    }

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        const formData = {
            comment: comment,
            rating: rating ? rating * 2 : null,
        }
        onCommentSubmit(formData)
        setComment('')
        setRating(null)
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                placeholder="Write your comment here..."
                value={comment}
                onChange={handleCommentChange}
                fullWidth={true}
                required
                sx={{ my: 3 }}
            />
            <div>
                <Rating
                    name="rating"
                    value={rating}
                    onChange={handleRatingChange}
                />
            </div>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
            >
                Submit Comment
            </Button>
        </form>
    )
}

export default BlogPostCommentCreate
