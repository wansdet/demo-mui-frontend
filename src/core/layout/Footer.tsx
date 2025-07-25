import React from 'react'
import { styled } from '@mui/system'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, Container, Grid, Typography } from '@mui/material'

import { ContactUs, Newsletter, OpeningHours, SocialMedia } from '@/core/layout'

const footerTheme = createTheme({
    palette: {
        mode: 'dark',
    },
})

const FooterWrapper = styled('footer')({
    backgroundColor: '#222',
    height: 'auto',
    color: '#fff',
    marginTop: 'auto',
})

const Footer = () => (
    <ThemeProvider theme={footerTheme}>
        <FooterWrapper>
            <Container
                data-testid="app-footer"
                maxWidth="lg"
                sx={{
                    py: 5,
                }}
            >
                <Grid container spacing={5} sx={{ mb: 3 }}>
                    <Grid data-testid="newsletter" size={{ xs: 12, sm: 4 }}>
                        <Newsletter />
                    </Grid>
                    <Grid data-testid="opening-hours" size={{ xs: 12, sm: 4 }}>
                        <OpeningHours />
                    </Grid>
                    <Grid data-testid="contact-us" size={{ xs: 12, sm: 4 }}>
                        <ContactUs />
                    </Grid>
                </Grid>
            </Container>
            <Container
                maxWidth={false}
                sx={{
                    backgroundColor: '#000',
                    py: 1,
                }}
            >
                <Grid container spacing={2}>
                    <Grid data-test="copyright" size={{ xs: 12, sm: 6 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '100%',
                            }}
                        >
                            <Typography variant="body2" component="span">
                                {'Copyright © '}
                                {new Date().getFullYear()} demo@example.com
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid data-testid="social-media" size={{ xs: 12, sm: 6 }}>
                        <SocialMedia />
                    </Grid>
                </Grid>
            </Container>
        </FooterWrapper>
    </ThemeProvider>
)

export default Footer
