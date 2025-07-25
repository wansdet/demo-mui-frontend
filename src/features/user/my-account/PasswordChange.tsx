import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Alert, Box, Button, FormLabel, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
    ApplicationContext,
    API_URL_USER_ACCOUNT,
    API_URL_USER_PASSWORD_CHANGE,
    APP_NAME,
} from '@/core/application'
import { useApiGet, useApiPatch } from '@/core/api'
import { SecurityContext } from '@/core/security'
import useNotification from '@/common/hooks/feedback/useNotification'
import {
    IUserPasswordChange,
    IUserUpdate,
    userPasswordChangeSchema,
} from '@/common/models/user'
import { ButtonSubmit, FormInput } from '@/components/inputs'

const PasswordChange = () => {
    const [id, setId] = useState<string>('')
    const [user, setUser] = useState<IUserUpdate | null>(null)
    const [passwordChanged, setPasswordChanged] = useState<boolean>(false)
    const [invalidCredentials, setInvalidCredentials] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const { showNotification, NotificationComponent } = useNotification()
    const { data: fetchedUser } = useApiGet<IUserUpdate>(API_URL_USER_ACCOUNT)
    const {
        patchData: updatedUser,
        loading: getLoading,
        error: getError,
    } = useApiPatch<IUserPasswordChange>(
        `${API_URL_USER_PASSWORD_CHANGE}/${id}`,
    )

    const title = 'Change password'
    document.title = `${title} | ${APP_NAME}`

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const auth = React.useContext(SecurityContext)
    const navigate = useNavigate()

    const formOptions = { resolver: yupResolver(userPasswordChangeSchema) }
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm(formOptions)

    useEffect(() => {
        if (fetchedUser) {
            setUser(fetchedUser)
            setId(fetchedUser.userId)
        }
    }, [fetchedUser])

    useEffect(() => {
        if (getLoading) {
            showLoading()
        } else {
            hideLoading()
        }
    }, [getLoading, hideLoading, showLoading])

    const onSubmit = (data: any) => {
        const formData = {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
        }

        updatedUser(formData)
            .then(() => {
                setInvalidCredentials(false)
                setPasswordChanged(true)
                showNotification('Password updated successfully', 'success')
            })
            .catch((error) => {
                if ([422].includes(error.response.status)) {
                    setInvalidCredentials(true)
                    setErrorMessage(error.response.data.description)
                } else {
                    showNotification(
                        'Error occurred while updating user',
                        'error',
                    )
                }
            })
    }

    const handleSignOut = () => {
        auth.logout(() => navigate('/'))
    }

    return (
        user && (
            <>
                <Box sx={{ backgroundColor: 'background.paper', p: 8 }}>
                    {invalidCredentials && (
                        <Alert
                            data-testid="password-change-error"
                            severity="error"
                            sx={{ mt: 0, mb: 5 }}
                        >
                            {errorMessage}
                        </Alert>
                    )}
                    {passwordChanged ? (
                        <>
                            <Alert
                                data-testid="password-changed"
                                severity="success"
                                sx={{ mt: 0, mb: 5 }}
                            >
                                Password changed successfully. Please sign out
                                and sign in again.
                            </Alert>
                            <Button variant="contained" onClick={handleSignOut}>
                                Sign out
                            </Button>
                        </>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormLabel htmlFor="currentPassword">
                                        Current password
                                    </FormLabel>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <FormInput
                                        name="currentPassword"
                                        control={control}
                                        type="password"
                                        errors={errors}
                                        defaultValue=""
                                        fullWidth
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormLabel htmlFor="newPassword">
                                        New password
                                    </FormLabel>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <FormInput
                                        name="newPassword"
                                        control={control}
                                        type="password"
                                        errors={errors}
                                        defaultValue=""
                                        fullWidth
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}>
                                    <FormLabel htmlFor="confirmPassword">
                                        Confirm password
                                    </FormLabel>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <FormInput
                                        name="confirmPassword"
                                        control={control}
                                        type="password"
                                        errors={errors}
                                        defaultValue=""
                                        fullWidth
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4 }}></Grid>
                                <Grid size={{ xs: 12, sm: 8 }}>
                                    <ButtonSubmit sx={{ mt: 3, mb: 2 }}>
                                        Submit
                                    </ButtonSubmit>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Box>
                <NotificationComponent />
            </>
        )
    )
}

export default PasswordChange
