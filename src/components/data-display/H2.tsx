import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'

type H2Props = TypographyProps & {
    className?: string
}

const H2 = ({
    className,
    children,
    ...props
}: {
    children: React.ReactNode
} & H2Props) => (
        <Typography
            className={className}
            data-test="h2"
            variant="h4"
            component="h2"
            mt={3}
            mb={1}
            gutterBottom
            {...props}
        >
            {children}
        </Typography>
    )

export default H2
