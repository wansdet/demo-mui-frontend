import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Container, FormLabel, Grid, Input } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

import { ApplicationContext, API_URL_USERS } from '@/core/application'
import { useApiGet } from '@/core/api'
import { AdminFooter } from '@/core/layout'
import { IUser, genderOptions, userStatuses } from '@/common/models/user'
import { getOptionByValue } from '@/utils/generic'
import { ChipStatus, H1 } from '@/components/data-display'

const AdminUserShow = () => {
    const { id } = useParams()
    const [user, setUser] = useState<IUser | null>(null)
    const {
        data: fetchedUser,
        loading: getLoading,
        error: getError,
    } = useApiGet<IUser>(`${API_URL_USERS}/${id}`)

    const { showLoading, hideLoading } = useContext(ApplicationContext)
    const navigate = useNavigate()

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
    }, [getLoading])

    const userRolesList = (roles: (string | undefined)[]) => {
        return roles.filter((role) => role !== undefined).join(', ')
    }

    return (
        <React.Fragment>
            {user && (
                <React.Fragment>
                    <Container
                        data-testid="admin-user-show-content"
                        maxWidth="md"
                        component="main"
                        sx={{ pt: 0, pb: 8 }}
                    >
                        <H1 variant="h3" data-testid="page-heading">
                            User: {user.firstName} {user.lastName}
                        </H1>
                        <Button
                            data-testid="return-button"
                            color="primary"
                            startIcon={<ChevronLeftIcon />}
                            sx={{ mb: 3 }}
                            onClick={() => navigate(-1)}
                        >
                            Return
                        </Button>
                        <Box sx={{ backgroundColor: 'background.paper', p: 8 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="id"
                                        data-testid="id-label"
                                    >
                                        ID
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="id"
                                        data-testid="id"
                                        name="id"
                                        value={user.userId}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="displayName"
                                        data-testid="display-name-label"
                                    >
                                        Display name
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="displayName"
                                        data-testid="display-name"
                                        name="displayName"
                                        value={user.displayName}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="firstName"
                                        data-testid="first-name-label"
                                    >
                                        First name
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="firstName"
                                        data-testid="first-name"
                                        name="firstName"
                                        value={user.firstName}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="lastName"
                                        data-testid="last-name-label"
                                    >
                                        Last name
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="lastName"
                                        data-testid="last-name"
                                        name="lastName"
                                        value={user.lastName}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="middleName"
                                        data-testid="middle-name-label"
                                    >
                                        Middle name
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="middleName"
                                        data-testid="middle-name"
                                        name="middleName"
                                        value={user.middleName}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="sex"
                                        data-testid="sex-label"
                                    >
                                        Gender
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="sex"
                                        data-testid="sex"
                                        name="sex"
                                        value={
                                            getOptionByValue(
                                                user.sex,
                                                genderOptions
                                            ).label
                                        }
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="email"
                                        data-testid="email-label"
                                    >
                                        Email
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="email"
                                        data-testid="email"
                                        name="email"
                                        value={user.email}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="jobTitle"
                                        data-testid="job-title-label"
                                    >
                                        Job title
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="jobTitle"
                                        data-testid="job-title"
                                        name="jobTitle"
                                        value={user.jobTitle}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="roles"
                                        data-testid="roles-label"
                                    >
                                        Roles
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="roles"
                                        data-testid="roles"
                                        name="roles"
                                        value={userRolesList(user.roles)}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="status"
                                        data-testid="status-label"
                                    >
                                        Status
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <ChipStatus
                                        id="status"
                                        statusValue={user.status}
                                        statuses={userStatuses}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="createdBy"
                                        data-testid="created-by-label"
                                    >
                                        Created By
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="createdBy"
                                        data-testid="created-by"
                                        name="createdBy"
                                        value={user.createdBy}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="createdAt"
                                        data-testid="created-at-label"
                                    >
                                        Created
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="createdAt"
                                        data-testid="created-at"
                                        name="createdAt"
                                        value={user.createdAt}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="updatedBy"
                                        data-testid="updated-by-label"
                                    >
                                        Updated By
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="updatedBy"
                                        data-testid="updated-by"
                                        name="updatedBy"
                                        value={user.updatedBy}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormLabel
                                        htmlFor="updatedAt"
                                        data-testid="updated-at-label"
                                    >
                                        Last updated
                                    </FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Input
                                        id="updatedAt"
                                        data-testid="updated-at"
                                        name="updatedAt"
                                        value={user.updatedAt}
                                        fullWidth={true}
                                        inputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                    <AdminFooter />
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default AdminUserShow
