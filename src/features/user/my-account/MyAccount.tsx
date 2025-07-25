import React from 'react'
import { Box, Container, Tabs, Tab, Typography } from '@mui/material'

import Footer from '@/core/layout/Footer'
import { H1 } from '@/components/data-display'
import { PasswordChange, PersonalDetails } from '@/features/user/my-account'

interface ITabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

const CustomTabPanel = (props: ITabPanelProps) => {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

const MyAccount = () => {
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <>
            <Container maxWidth="md" component="main" sx={{ pt: 0, pb: 8 }}>
                <H1 id="my-account-heading" variant="h3">My Account</H1>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Personal Details" {...a11yProps(0)} />
                        <Tab label="Change Password" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <PersonalDetails />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <PasswordChange />
                </CustomTabPanel>
            </Container>
            <Footer />
        </>
    )
}

export default MyAccount
