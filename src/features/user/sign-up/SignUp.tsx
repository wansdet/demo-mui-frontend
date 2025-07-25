import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import {
    Alert,
    Checkbox,
    FormControlLabel,
    Grid,
    MenuItem,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { API_URL_USERS, APP_NAME, PATH_WELCOME } from '@/core/application'
import { useApiPost } from '@/core/api'
import useNotification from '@/common/hooks/feedback/useNotification'
import {
    genderOptions,
    IUser,
    titleOptions,
    userSignUpSchema,
} from '@/common/models/user'
import { ButtonSubmit, FormInputText, FormSelect } from '@/components/inputs'
import { SignUpHelper, SignUpTemplate } from '@/features/user'

const SignUp = () => {
    const [displayError, setDisplayError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const { showNotification, NotificationComponent } = useNotification()
    const navigate = useNavigate()
    const title = 'Sign up'

    document.title = `${title} | ${APP_NAME}`

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
        // console.log(data)
        user(data)
            .then(() => {
                navigate(PATH_WELCOME, { replace: true })
            })
            .catch((error) => {
                if ([422].includes(error.response.status)) {
                    setErrorMessage(error.response.data.description)
                    setDisplayError(true)
                } else {
                    showNotification(
                        'Error occurred while creating user account',
                        'error',
                    )
                }
            })
    }

    return (
        <>
            <SignUpTemplate title={title}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} sx={{ pt: 3 }}>
                        {displayError && (
                            <Grid size={{ xs: 12 }}>
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {errorMessage}
                                </Alert>
                            </Grid>
                        )}
                        <Grid size={{ xs: 12 }}>
                            <FormSelect
                                data-testid="sign-up-title-select"
                                name="title"
                                label="Title"
                                control={control}
                                errors={errors}
                                sx={{ my: 0 }}
                            >
                                {titleOptions.map((titleOption) => (
                                    <MenuItem
                                        key={titleOption.value}
                                        value={titleOption.value}
                                    >
                                        {titleOption.label}
                                    </MenuItem>
                                ))}
                            </FormSelect>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormInputText
                                name="firstName"
                                control={control}
                                label="First name"
                                type="text"
                                errors={errors}
                                sx={{ my: 0 }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormInputText
                                name="lastName"
                                control={control}
                                label="Last name"
                                type="text"
                                errors={errors}
                                sx={{ my: 0 }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormInputText
                                name="email"
                                control={control}
                                label="Email"
                                type="email"
                                errors={errors}
                                sx={{ my: 0 }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormInputText
                                name="displayName"
                                control={control}
                                label="Display name"
                                type="text"
                                errors={errors}
                                sx={{ my: 0 }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormInputText
                                name="password"
                                control={control}
                                label="Password"
                                type="password"
                                errors={errors}
                                sx={{ my: 0 }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormInputText
                                name="confirmPassword"
                                control={control}
                                label="Confirm Password"
                                type="password"
                                errors={errors}
                                sx={{ my: 0 }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormSelect
                                data-testid="sign-up-gender-select"
                                name="gender"
                                label="Gender"
                                control={control}
                                errors={errors}
                                sx={{ my: 0 }}
                            >
                                {genderOptions.map((genderOption) => (
                                    <MenuItem
                                        key={genderOption.value}
                                        value={genderOption.value}
                                    >
                                        {genderOption.label}
                                    </MenuItem>
                                ))}
                            </FormSelect>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
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
                    <ButtonSubmit
                        data-testid="sign-up-submit-btn"
                        fullWidth
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign up
                    </ButtonSubmit>
                    <SignUpHelper />
                </form>
            </SignUpTemplate>
            <NotificationComponent />
        </>
    )
}

export default SignUp
