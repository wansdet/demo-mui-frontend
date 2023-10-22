import React from 'react'
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material'

import { H2 } from '@/components/data-display'

const ContactUsForm = () => {
    return (
        <React.Fragment>
            <form data-testid="contact-us-form">
                <H2 data-testid="contact-us-form-text">Send us a message</H2>

                <TextField
                    data-testid="name"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    aria-label="name"
                    sx={{ mt: 3, mb: 1 }}
                />
                <TextField
                    data-testid="email"
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    aria-label="email"
                    sx={{ mt: 1, mb: 1 }}
                />
                <TextField
                    data-testid="message"
                    name="message"
                    label="Message"
                    type="text"
                    multiline
                    rows={4}
                    fullWidth
                    aria-label="message"
                    sx={{ mt: 1, mb: 3 }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            data-testid="privacy-policy"
                            name="privacyPolicy"
                        />
                    }
                    label="By submitting this form you agree to our privacy policy"
                />
                <Button
                    data-testid="send-message"
                    variant="contained"
                    sx={{ mt: 3 }}
                >
                    Send Message
                </Button>
            </form>
        </React.Fragment>
    )
}

export default ContactUsForm
