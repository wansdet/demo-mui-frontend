import type { IOption } from '@/common'

export const getOptionByValue = (
    value: string | undefined,
    options: IOption[]
): IOption => <IOption>options.find((option) => option.value === value)
