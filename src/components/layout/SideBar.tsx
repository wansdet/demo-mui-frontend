import React from 'react'
import Grid from '@mui/material/Grid'

interface ISideBarProps {
    id?: string
    children: React.ReactNode
}

const SideBar = ({ id, children }: ISideBarProps) => {
    return (
        <Grid id={id} size={{ xs: 12, md: 4 }}>
            {children}
        </Grid>
    )
}

export default SideBar
