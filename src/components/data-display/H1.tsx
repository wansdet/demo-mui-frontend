import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'

type H1Props = TypographyProps & {
    className?: string
}

const H1 = ({
    className,
    children,
    ...props
}: {
    children: React.ReactNode
} & H1Props) => (
        <Typography
            className={className}
            data-test="h1"
            component="h1"
            variant="h2"
            gutterBottom
            {...props}
        >
            {children}
        </Typography>
    )

export default H1
