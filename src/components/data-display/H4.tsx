import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'

type H4Props = TypographyProps & {
    className?: string
}

const H4 = ({
    className,
    children,
    ...props
}: {
    children: React.ReactNode
} & H4Props) => (
        <Typography
            className={className}
            data-test="h4"
            variant="h6"
            component="h4"
            mt={1}
            mb={1}
            gutterBottom
            {...props}
        >
            {children}
        </Typography>
    )

export default H4
