import React from 'react'
import Input, { InputProps } from '@mui/material/Input'
import FormHelperText from '@mui/material/FormHelperText'
import {
    Controller,
    Control,
    FieldErrors,
    FieldValues,
    Path, PathValue
} from 'react-hook-form'

interface IFormInputProps<T extends FieldValues>
    extends Omit<InputProps, 'name' | 'control' | 'defaultValue'> {
    name: Path<T>
    control: Control<T>
    type: string
    color?: 'primary' | 'secondary'
    errors: FieldErrors<T>
    defaultValue?: PathValue<T, Path<T>> | undefined
}

const FormInput = <T extends FieldValues>({
                          name,
                          control,
                          type = 'text',
                          color = 'secondary',
                          errors,
                          defaultValue,
                          ...props
                      }: IFormInputProps<T>) => (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <>
                    <Input
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
                        {errors[name]?.message as string}
                    </FormHelperText>
                </>
            )}
        />
    )

export default FormInput