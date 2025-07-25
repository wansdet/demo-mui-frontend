import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Alert, Checkbox, FormControlLabel } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { ApplicationContext, APP_NAME } from '@/core/application'
import { IUserCredential, userCredentialsSchema } from '@/common/models/user'
import { SecurityContext } from '@/core/security'
import { SignInHelper, SignInTemplate } from '@/features/user/sign-in'
import { ButtonSubmit, FormInputText } from '@/components/inputs'

const SignIn = () => {
    const [invalidCredentials, setInvalidCredentials] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const title = 'Sign in'
    const { login } = useContext(SecurityContext)
    const { hideLoading } = useContext(ApplicationContext)
    const formOptions = { resolver: yupResolver(userCredentialsSchema) }

    document.title = `${title} | ${APP_NAME}`

    useEffect(() => {
        // Hide loading indicator when SignIn component is mounted in case of 401 redirect
        hideLoading()
    }, [hideLoading])

    const {
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm(formOptions)

    const onSubmit = (data: any) => {
        const userCredentials: IUserCredential = {
            username: data.email,
            password: data.password,
        }

        try {
            login(userCredentials, (response) => {
                if (typeof response === 'string') {
                    setInvalidCredentials(true)
                    setErrorMessage(response)
                } else {
                    navigate(from, { replace: true })
                }
            })
        } catch (error) {
            console.error('Error during login:', error)
        }
    }

return (
        <SignInTemplate title={title}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                data-testid="sign-in-form"
            >
                {invalidCredentials && (
                    <Alert
                        data-testid="sign-in-error-alert"
                        severity="error"
                        sx={{ mt: 3, mb: 3 }}
                    >
                        {errorMessage}
                    </Alert>
                )}
                <FormInputText
                    data-test="email-input"
                    name="email"
                    control={control}
                    label="Email"
                    type="email"
                    errors={errors}
                />
                <FormInputText
                    data-test="password-input"
                    name="password"
                    control={control}
                    label="Password"
                    type="password"
                    errors={errors}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            id="remember-me-checkbox"
                            data-testid="remember-me-checkbox"
                            name="rememberMe"
                            value="rememberMe"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <ButtonSubmit
                    data-testid="sign-in-submit-btn"
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </ButtonSubmit>
                <SignInHelper />
            </form>
        </SignInTemplate>
    )
}

export default SignIn
