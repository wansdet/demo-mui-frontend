import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, FormLabel, Grid, MenuItem } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
    ApplicationContext,
    API_URL_USER_ACCOUNT,
    APP_NAME,
} from '@/core/application'
import { useApiGet, useApiPut } from '@/core/api'
import useNotification from '@/common/hooks/feedback/useNotification'
import {
    IUserUpdate,
    genderOptions,
    userStatuses,
    userAccountUpdateSchema,
} from '@/common/models/user'
import { ButtonSubmit, FormInput, FormSelect } from '@/components/inputs'

const PersonalDetails = () => {
    const [id, setId] = useState<string>('')
    const [user, setUser] = useState<IUserUpdate | null>(null)
    const { showNotification, NotificationComponent } = useNotification()
    const { data: fetchedUser } = useApiGet<IUserUpdate>(API_URL_USER_ACCOUNT)
    const {
        putData: updatedUser,
        loading: getLoading,
        error: getError,
    } = useApiPut<IUserUpdate>(`${API_URL_USER_ACCOUNT}/${id}`)

    const title = 'Personal details'
    document.title = `${title} | ${APP_NAME}`

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const navigate = useNavigate()

    const formOptions = { resolver: yupResolver(userAccountUpdateSchema) }
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
    }, [getLoading])

    const onSubmit = (data: any) => {
        const formData = {
            ...data,
            middleName: data.middleName ? data.middleName : null,
        }

        updatedUser(formData)
            .then(() => {
                showNotification(
                    'Personal details updated successfully',
                    'success'
                )
            })
            .catch((error) => {
                // Possibly add more error codes
                if ([422].includes(error.response.status)) {
                    showNotification(
                        error.response.data['hydra:description'],
                        'error'
                    )
                } else {
                    showNotification(
                        'Error occurred while updating user',
                        'error'
                    )
                }
            })
    }

    return (
        <React.Fragment>
            {user && (
                <React.Fragment>
                    <Box sx={{ backgroundColor: 'background.paper', p: 8 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="displayName">
                                        Display name
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="displayName"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={user.displayName}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="firstName">
                                        First name
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="firstName"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={user.firstName}
                                        fullWidth={true}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="lastName">
                                        Last name
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="lastName"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={user.lastName}
                                        fullWidth={true}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="middleName">
                                        Middle name
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="middleName"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={user.middleName}
                                        fullWidth={true}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="sex">Gender</FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormSelect
                                        name="sex"
                                        label=""
                                        control={control}
                                        errors={errors}
                                        defaultValue={user.sex}
                                        sx={{ my: 0 }}
                                    >
                                        {genderOptions.map(
                                            (genderOption, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={genderOption.value}
                                                >
                                                    {genderOption.label}
                                                </MenuItem>
                                            )
                                        )}
                                    </FormSelect>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="email"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={user.email}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="jobTitle">
                                        Job title
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormInput
                                        name="jobTitle"
                                        control={control}
                                        type="text"
                                        errors={errors}
                                        defaultValue={user.jobTitle}
                                        fullWidth={true}
                                        sx={{ m: 0, p: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel htmlFor="status">
                                        Status
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <FormSelect
                                        name="status"
                                        label=""
                                        control={control}
                                        errors={errors}
                                        defaultValue={user.status}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                        sx={{ my: 0 }}
                                    >
                                        {userStatuses.map(
                                            (statusOption, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={statusOption.value}
                                                >
                                                    {statusOption.label}
                                                </MenuItem>
                                            )
                                        )}
                                    </FormSelect>
                                </Grid>
                                <Grid item xs={12} sm={4}></Grid>
                                <Grid item xs={12} sm={8}>
                                    <ButtonSubmit sx={{ mt: 3, mb: 2 }}>
                                        Submit
                                    </ButtonSubmit>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                    <NotificationComponent />
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default PersonalDetails
