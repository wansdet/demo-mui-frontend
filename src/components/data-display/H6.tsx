import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'

type H6Props = TypographyProps & {
    className?: string
}

const H6 = ({
    className,
    children,
    ...props
}: {
    children: React.ReactNode
} & H6Props) => (
        <Typography
            className={className}
            data-test="h6"
            variant="h6"
            component="h6"
            mt={1}
            mb={1}
            gutterBottom
            {...props}
        >
            {children}
        </Typography>
    )

export default H6
