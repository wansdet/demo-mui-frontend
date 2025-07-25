import React from 'react'
import { Button, TextField, Typography } from '@mui/material'

import { H3 } from '@/components/data-display'

const Newsletter = () => (
        <>
            <H3 data-testid="newsletter-heading">Newsletter</H3>
            <Typography
                data-testid="newsletter-description"
                variant="body2"
                paragraph
            >
                By subscribing to our company newsletter, you'll always be in
                the know when it comes to the most exciting promotions,
                unbeatable deals, and our extensive vehicle inventory.
            </Typography>
            <TextField
                id="email-address"
                data-testid="email-address"
                label="Email address"
                size='small'
                variant="outlined"
                fullWidth
            />
            <Button
                id="subscribe"
                data-testid="subscribe-btn"
                variant="contained"
                sx={{
                    backgroundColor: 'purple',
                    color: '#fff',
                    my: 2,
                }}
            >
                Subscribe
            </Button>
        </>
    )

export default Newsletter
