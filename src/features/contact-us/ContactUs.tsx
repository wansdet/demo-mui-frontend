import React from 'react'
import { Box, Container, Grid } from '@mui/material'

import { APP_NAME } from '@/core/application'
import { H2, H1 } from '@/components/data-display'

import {
    AddressDetails,
    ContactDetails,
    ContactUsForm,
} from '@/features/contact-us/'
import { Footer } from '@/core/layout'

const ContactUs = () => {
    const title = 'Contact Us'
    document.title = `${title} | ${APP_NAME}`

    return (
        <React.Fragment>
            <Container maxWidth="lg" component="main" sx={{ pt: 0, pb: 8 }}>
                <H1 data-testid="contact-us-heading">{title}</H1>
            </Container>
            <Box sx={{ backgroundColor: 'white' }}>
                <Container maxWidth="lg" component="main" sx={{ pt: 0, pb: 8 }}>
                    <Grid container spacing={4}>
                        <Grid
                            data-testid="contacts-section"
                            item
                            xs={12}
                            md={6}
                        >
                            <H2 data-testid="contacts-heading">Contacts</H2>
                            <Grid container spacing={0} sx={{ mt: 3 }}>
                                <Grid item xs={12} md={6}>
                                    <ContactDetails />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid data-testid="address-section" item xs={12} md={6}>
                            <H2 data-testid="address-heading">Address</H2>
                            <Grid container spacing={0} sx={{ mt: 3 }}>
                                <Grid item xs={12} md={6}>
                                    <AddressDetails />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            data-testid="contact-us-form-section"
                            item
                            xs={12}
                            md={6}
                        >
                            <ContactUsForm />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            <Footer />
        </React.Fragment>
    )
}

export default ContactUs
