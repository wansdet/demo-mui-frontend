import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Grid,
    Input,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { ApplicationContext, API_URL_USERS } from '@/core/application'
import { useApiGet, useApiPatch } from '@/core/api'
import { AdminFooter } from '@/core/layout'
import useNotification from '@/common/hooks/feedback/useNotification'
import {
    IUserUpdate,
    genderOptions,
    userRoles,
    userStatuses,
    userUpdateSchema,
} from '@/common/models/user'
import { ButtonSubmit, FormInput, FormSelect } from '@/components/inputs'
import { H1 } from '@/components/data-display'

const AdminUserEdit = () => {
    const { id } = useParams()
    const [user, setUser] = useState<IUserUpdate | null>(null)
    const { showNotification, NotificationComponent } = useNotification()
    const { data: fetchedUser } = useApiGet<IUserUpdate>(
        `${API_URL_USERS}/${id}`,
    )
    const {
        patchData: updatedUser,
        loading: getLoading,
        error: getError,
    } = useApiPatch<IUserUpdate>(`${API_URL_USERS}/${id}`)

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const navigate = useNavigate()

    const formOptions = { resolver: yupResolver(userUpdateSchema) }
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
            ...data,
            middleName: data.middleName ? data.middleName : null,
        }

        updatedUser(formData)
            .then(() => {
                showNotification('User successfully updated', 'success')
            })
            .catch((error) => {
                // Possibly add more error codes
                if ([422].includes(error.response.status)) {
                    showNotification(error.response.data.description, 'error')
                } else {
                    showNotification(
                        'Error occurred while updating user',
                        'error',
                    )
                }
            })
    }

    const handleChangeMultiple = (
        event: SelectChangeEvent<string[]>,
        child: ReactNode,
    ) => {
        // @ts-ignore
        const { options } = event.target
        const value: string[] = []
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value)
            }
        }
    }

    return (
        <>
            {user && (
                <>
                    <Container
                        data-testid="admin-user-edit-content"
                        maxWidth="md"
                        component="main"
                        sx={{ pt: 0, pb: 8 }}
                    >
                        <H1 variant="h3" data-testid="page-heading">
                            User: {user.firstName} {user.lastName}
                        </H1>
                        <Button
                            data-testid="return-btn"
                            color="primary"
                            startIcon={<ChevronLeftIcon />}
                            sx={{ mb: 3 }}
                            onClick={() => navigate(-1)}
                        >
                            Return
                        </Button>
                        <Box sx={{ backgroundColor: 'background.paper', p: 8 }}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormLabel
                                            htmlFor="id"
                                            data-testid="id-label"
                                        >
                                            ID
                                        </FormLabel>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        <FormInput
                                            name="id"
                                            data-testid="id"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={user.userId}
                                            fullWidth
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ m: 0, p: 0 }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormLabel
                                            htmlFor="displayName"
                                            data-testid="display-name-label"
                                        >
                                            Display name
                                        </FormLabel>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        <FormInput
                                            name="displayName"
                                            data-testid="display-name"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={user.displayName}
                                            fullWidth
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ m: 0, p: 0 }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormLabel
                                            htmlFor="title"
                                            data-testid="title-label"
                                        >
                                            Title
                                        </FormLabel>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        <FormInput
                                            name="title"
                                            data-testid="title"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={user.title}
                                            fullWidth
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ m: 0, p: 0 }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormLabel
                                            htmlFor="firstName"
                                            data-testid="first-name-label"
                                        >
                                            First name
                                        </FormLabel>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        <FormInput
                                            name="firstName"
                                            data-testid="first-name"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={user.firstName}
                                            fullWidth
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ m: 0, p: 0 }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormLabel
                                            htmlFor="lastName"
                                            data-testid="last-name-label"
                                        >
                                            Last name
                                        </FormLabel>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        <FormInput
                                            data-testid="last-name"
                                            name="lastName"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={user.lastName}
                                            fullWidth
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ m: 0, p: 0 }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormLabel
                                            htmlFor="middleName"
                                            data-testid="middle-name-label"
                                        >
                                            Middle name
                                        </FormLabel>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        <FormInput
                                            data-testid="middle-name"
                                            name="middleName"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={user.middleName}
                                            fullWidth
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ m: 0, p: 0 }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormLabel
                                            htmlFor="gender"
                                            data-testid="gender-label"
                                        >
                                            Gender
                                        </FormLabel>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        <FormSelect
                                            data-testid="gender"
                                            name="gender"
                                            label=""
                                            control={control}
                                            errors={errors}
                                            defaultValue={user.gender}
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ my: 0 }}
                                        >
                                            {genderOptions.map(
                                                (genderOption) => (
                                                    <MenuItem
                                                        key={genderOption.value}
                                                        value={
                                                            genderOption.value
                                                        }
                                                    >
                                                        {genderOption.label}
                                                    </MenuItem>
                                                ),
                                            )}
                                        </FormSelect>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormLabel
                                            htmlFor="email"
                                            data-testid="email-label"
                                        >
                                            Email
                                        </FormLabel>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        <FormInput
                                            data-testid="email"
                                            name="email"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={user.email}
                                            fullWidth
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ m: 0, p: 0 }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormLabel
                                            htmlFor="jobTitle"
                                            data-testid="job-title-label"
                                        >
                                            Job title
                                        </FormLabel>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        <FormInput
                                            data-testid="job-title"
                                            name="jobTitle"
                                            control={control}
                                            type="text"
                                            errors={errors}
                                            defaultValue={user.jobTitle}
                                            fullWidth
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                            sx={{ m: 0, p: 0 }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormLabel
                                            htmlFor="roles"
                                            data-testid="roles-label"
                                        >
                                            Roles
                                        </FormLabel>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        <FormControl fullWidth>
                                            <Select
                                                data-testid="roles"
                                                defaultValue={
                                                    user.roles.filter(
                                                        Boolean,
                                                    ) as string[]
                                                } // Filter and cast to string[]
                                                {...register('roles')}
                                                multiple
                                                native
                                                sx={{ m: 0, p: 0 }}
                                                onChange={handleChangeMultiple}
                                            >
                                                {userRoles.map(
                                                    (userRoleOption) => (
                                                        <option
                                                            key={
                                                                userRoleOption.value
                                                            }
                                                            value={
                                                                userRoleOption.value
                                                            }
                                                        >
                                                            {
                                                                userRoleOption.label
                                                            }
                                                        </option>
                                                    ),
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormLabel
                                            htmlFor="status"
                                            data-testid="status-label"
                                        >
                                            Status
                                        </FormLabel>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        <FormSelect
                                            data-testid="status"
                                            name="status"
                                            label=""
                                            control={control}
                                            errors={errors}
                                            defaultValue={user.status}
                                            sx={{ my: 0 }}
                                        >
                                            {userStatuses.map(
                                                (statusOption) => (
                                                    <MenuItem
                                                        key={statusOption.value}
                                                        value={
                                                            statusOption.value
                                                        }
                                                    >
                                                        {statusOption.label}
                                                    </MenuItem>
                                                ),
                                            )}
                                        </FormSelect>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormLabel
                                            htmlFor="createdBy"
                                            data-testid="created-by-label"
                                        >
                                            Created By
                                        </FormLabel>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        <Input
                                            id="createdBy"
                                            data-testid="created-by"
                                            name="createdBy"
                                            value={user.createdBy}
                                            fullWidth
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormLabel
                                            htmlFor="createdAt"
                                            data-testid="created-at-label"
                                        >
                                            Created
                                        </FormLabel>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        <Input
                                            id="createdAt"
                                            data-testid="created-at"
                                            name="createdAt"
                                            value={user.createdAt}
                                            fullWidth
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormLabel
                                            htmlFor="updatedBy"
                                            data-testid="updated-by-label"
                                        >
                                            Updated By
                                        </FormLabel>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        <Input
                                            id="updatedBy"
                                            data-testid="updated-by"
                                            name="updatedBy"
                                            value={user.updatedBy}
                                            fullWidth
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <FormLabel
                                            htmlFor="updatedAt"
                                            data-testid="updated-at-label"
                                        >
                                            Last updated
                                        </FormLabel>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        <Input
                                            id="updatedAt"
                                            data-testid="updated-at"
                                            name="updatedAt"
                                            value={user.updatedAt}
                                            fullWidth
                                            inputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 4 }}></Grid>
                                    <Grid size={{ xs: 12, sm: 8 }}>
                                        <ButtonSubmit
                                            data-testid="submit-btn"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            Submit
                                        </ButtonSubmit>
                                    </Grid>
                                </Grid>
                            </form>
                        </Box>
                        <NotificationComponent />
                    </Container>
                    <AdminFooter />
                </>
            )}
        </>
    )
}

export default AdminUserEdit
