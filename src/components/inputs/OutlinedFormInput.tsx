import React from 'react'
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import { Controller } from 'react-hook-form'

interface IOutlinedFormInputProps
    extends Omit<OutlinedInputProps, 'name' | 'control' | 'defaultValue'> {
    name: string
    control: any
    type: string
    color?: 'primary' | 'secondary'
    errors: any
    defaultValue?: string | number | null
}

const OutlinedFormInput = ({
    name,
    control,
    type = 'text',
    color = 'secondary',
    errors,
    defaultValue = '',
    ...props
}: IOutlinedFormInputProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <React.Fragment>
                    <OutlinedInput
                        {...field}
                        value={field.value}
                        type={type}
                        color={color}
                        sx={{ m: 0, p: 0 }}
                        fullWidth
                        error={!!errors[name]}
                        {...props}
                    />
                    <FormHelperText id={`${name}-helper-text`}>
                        {errors[name]?.message}
                    </FormHelperText>
                </React.Fragment>
            )}
        />
    )
}

export default OutlinedFormInput
