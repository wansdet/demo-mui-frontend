import React from 'react'
import Grid from '@mui/material/Grid'

interface ISideBarProps {
    children: React.ReactNode
}

const SideBar = ({ children }: ISideBarProps) => {
    return (
        <Grid data-test="side-bar" item xs={12} md={4}>
            {children}
        </Grid>
    )
}

export default SideBar
