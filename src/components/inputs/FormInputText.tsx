import React from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { Controller, Control, FieldErrors, Path, PathValue, FieldValues } from 'react-hook-form'

interface IFormInputTextProps
    <T extends FieldValues>
    extends Omit<TextFieldProps, 'name' | 'control' | 'defaultValue'> {
    name: Path<T>
    control: Control<T>
    label: string
    type: string
    variant?: 'standard' | 'filled' | 'outlined'
    color?: 'primary' | 'secondary'
    errors: FieldErrors<T>
    defaultValue?: PathValue<T, Path<T>> | undefined
}

const FormInputText = <T extends FieldValues> ({
    name,
    control,
    label,
    type = 'text',
    variant = 'outlined',
    color = 'secondary',
    errors,
    defaultValue,
    ...props
}: IFormInputTextProps<T>) => (
    <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
            <TextField
                {...field}
                label={label}
                value={field.value}
                type={type}
                variant={variant}
                color={color}
                sx={{ mt: 2, mb: 1 }}
                fullWidth
                error={!!errors[name]}
                helperText={typeof errors[name]?.message === 'string' ? errors[name]?.message : ''}
                {...props}
            />
        )}
    />
)

export default FormInputText
