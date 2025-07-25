import React from 'react'
import { Chip, ChipProps } from '@mui/material'

import { IStatus } from '@/common'

interface IChipStatusProps {
    id?: string
    statusValue: string
    statuses: IStatus[]
    size?: ChipProps['size']
    variant?: 'filled' | 'outlined'
}

const getStatusByValue = (statuses: IStatus[], value: string): IStatus | undefined =>
    statuses.find((item: IStatus) => item.value === value)

const ChipStatus: React.FC<IChipStatusProps> = ({
    id,
    statusValue,
    statuses,
    size = 'medium',
    variant = 'filled',
}) => {
    const currentStatus = getStatusByValue(statuses, statusValue)

    return currentStatus ? (
        <Chip
            id={id}
            key={currentStatus.value}
            label={currentStatus.label}
            color={currentStatus.color as ChipProps['color']}
            size={size}
            variant={variant}
        />
    ) : null; // Explicitly return
}

export default ChipStatus
