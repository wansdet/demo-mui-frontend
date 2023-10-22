import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Alert,
    Checkbox,
    FormControlLabel,
    Grid,
    MenuItem,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { API_URL_USERS, PATH_WELCOME } from '@/core/application'
import { useApiPost } from '@/core/api'
import useNotification from '@/common/hooks/feedback/useNotification'
import { genderOptions, IUser, userSignUpSchema } from '@/common/models/user'
import { ButtonSubmit, FormInputText, FormSelect } from '@/components/inputs'
import { SignUpHelper, SignUpTemplate } from '@/features/user'

const SignUp = () => {
    const [displayError, setDisplayError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { showNotification, NotificationComponent } = useNotification()
    const navigate = useNavigate()

    const {
        postData: user,
        loading: userLoading,
        error: userError,
    } = useApiPost<IUser>(`${API_URL_USERS}`, false)

    const formOptions = { resolver: yupResolver(userSignUpSchema) }
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm(formOptions)

    const onSubmit = (data: any) => {
        console.log(data)
        user(data)
            .then(() => {
                navigate(PATH_WELCOME, { replace: true })
            })
            .catch((error) => {
                if ([422].includes(error.response.status)) {
                    setErrorMessage(error.response.data['hydra:description'])
                    setDisplayError(true)
                } else {
                    showNotification(
                        'Error occurred while creating user account',
                        'error'
                    )
                }
            })
    }

    return (
        <React.Fragment>
            <SignUpTemplate title="Sign up">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} sx={{ pt: 3 }}>
                        {displayError && (
                            <Grid item xs={12}>
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {errorMessage}
                                </Alert>
                            </Grid>
                        )}
                        <Grid item xs={12} sm={6}>
                            <FormInputText
                                name="firstName"
                                control={control}
                                label="First name"
                                type="text"
                                errors={errors}
                                sx={{ my: 0 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormInputText
                                name="lastName"
                                control={control}
                                label="Last name"
                                type="text"
                                errors={errors}
                                sx={{ my: 0 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText
                                name="email"
                                control={control}
                                label="Email"
                                type="email"
                                errors={errors}
                                sx={{ my: 0 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText
                                name="password"
                                control={control}
                                label="Password"
                                type="password"
                                errors={errors}
                                sx={{ my: 0 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInputText
                                name="confirmPassword"
                                control={control}
                                label="Confirm Password"
                                type="password"
                                errors={errors}
                                sx={{ my: 0 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormSelect
                                name="gender"
                                label="Gender"
                                control={control}
                                errors={errors}
                                sx={{ my: 0 }}
                            >
                                {genderOptions.map((genderOption, index) => (
                                    <MenuItem
                                        key={index}
                                        value={genderOption.value}
                                    >
                                        {genderOption.label}
                                    </MenuItem>
                                ))}
                            </FormSelect>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary"
                                    />
                                }
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <ButtonSubmit fullWidth sx={{ mt: 3, mb: 2 }}>
                        Sign up
                    </ButtonSubmit>
                    <SignUpHelper />
                </form>
            </SignUpTemplate>
            <NotificationComponent />
        </React.Fragment>
    )
}

export default SignUp
