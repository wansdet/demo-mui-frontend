import React from 'react'
import { Box, Stack } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'

const BlogPostSocialMedia = () => {
    return (
        <Box
            data-testid="blog-post-social-media-links"
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                my: 3,
            }}
        >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <FacebookIcon color="primary" />
                <TwitterIcon color="primary" />
                <InstagramIcon color="primary" />
                <WhatsAppIcon color="primary" />
                <LinkedInIcon color="primary" />
            </Stack>
        </Box>
    )
}

export default BlogPostSocialMedia
