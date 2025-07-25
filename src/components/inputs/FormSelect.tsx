import React from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { Control, Controller, FieldErrors, FieldValues, Path, PathValue } from 'react-hook-form'

interface IFormSelectProps
    <T extends FieldValues>
    extends Omit<TextFieldProps, 'name' | 'control' | 'defaultValue'> {
    name: Path<T>
    control: Control<T>
    label: string
    variant?: 'standard' | 'filled' | 'outlined'
    color?: 'primary' | 'secondary'
    errors: FieldErrors<T>
    defaultValue?: PathValue<T, Path<T>> | undefined
}

const FormSelect = <T extends FieldValues> ({
    name,
    control,
    label,
    variant = 'outlined',
    color = 'secondary',
    errors,
    defaultValue,
    children,
    ...props
}: { children: React.ReactNode } & IFormSelectProps<T>) => (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <TextField
                    {...field}
                    value={field.value}
                    select
                    label={label}
                    variant={variant}
                    color={color}
                    sx={{ mt: 2, mb: 1 }}
                    fullWidth
                    error={!!errors[name]}
                    helperText={typeof errors[name]?.message === 'string' ? errors[name]?.message : ''}
                    {...props}
                >
                    {children}
                </TextField>
            )}
        />
    )

export default FormSelect
