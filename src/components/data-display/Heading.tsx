import React, { ReactNode, useContext } from 'react'

import { LevelContext } from '@/components/data-display/LevelContext'
import H1 from '@/components/data-display/H1'
import H2 from '@/components/data-display/H2'
import H3 from '@/components/data-display/H3'
import H4 from '@/components/data-display/H4'
import H5 from '@/components/data-display/H5'
import H6 from '@/components/data-display/H6'

interface HeadingProps {
    className?: string
    children: ReactNode
}

const Heading = ({ className, children }: HeadingProps) => {
    const level = useContext(LevelContext)

    switch (level) {
        case 1:
            return <H1 className={className}>{children}</H1>
        case 2:
            return <H2 className={className}>{children}</H2>
        case 3:
            return <H3 className={className}>{children}</H3>
        case 4:
            return <H4 className={className}>{children}</H4>
        case 5:
            return <H5 className={className}>{children}</H5>
        default:
            return <H6 className={className}>{children}</H6>
    }
}

export default Heading
