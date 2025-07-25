import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'

type H3Props = TypographyProps & {
    className?: string
}

const H3 = ({
    className,
    children,
    ...props
}: {
    children: React.ReactNode
} & H3Props) => (
        <Typography
            className={className}
            data-test="h3"
            variant="h5"
            component="h3"
            mt={1}
            mb={1}
            gutterBottom
            {...props}
        >
            {children}
        </Typography>
    )

export default H3
