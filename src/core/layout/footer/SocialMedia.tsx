import React from 'react'
import { Box, Stack } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import YouTubeIcon from '@mui/icons-material/YouTube'

const SocialMedia = () => {
    return (
        <Box
            data-testid="social-media-links"
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                py: 1,
            }}
        >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                <FacebookIcon />
                <TwitterIcon />
                <InstagramIcon />
                <YouTubeIcon />
                <WhatsAppIcon />
                <LinkedInIcon />
            </Stack>
        </Box>
    )
}

export default SocialMedia
