import React from 'react'
import Typography, { TypographyProps } from '@mui/material/Typography'

type H5Props = TypographyProps & {
    className?: string
}

const H5 = ({
    className,
    children,
    ...props
}: {
    children: React.ReactNode
} & H5Props) => (
        <Typography
            className={className}
            data-test="h5"
            variant="h6"
            component="h5"
            mt={1}
            mb={1}
            gutterBottom
            {...props}
        >
            {children}
        </Typography>
    )

export default H5
