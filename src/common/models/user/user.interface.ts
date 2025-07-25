import { IAddress } from 'common/models/address'

export interface IUserCredential {
    username: string
    password: string
}

export interface IUserAuth {
    username: string
    roles: string[]
}

export interface IUser {
    id?: number
    userId: string
    email: string
    displayName?: string
    title: string
    firstName: string
    lastName: string
    middleName?: string
    roles: string[]
    gender?: string
    jobTitle?: string
    status: string
    description?: string
    createdAt?: Date
    createdBy?: string
    updatedAt?: Date
    updatedBy?: string
}

export interface IUserPublic {
    id?: number
    userId: string
    title: string
    firstName: string
    lastName: string
    jobTitle?: string
    gender?: string
    description?: string
}

export interface IUserProfile {
    name: string
    title: string
    description: string
    phoneNumber: string
    mobileNumber: string
    email: string
}

export interface IUserUpdate extends IUser {
    id: number
}

export interface IUserAddress extends IAddress {
    id?: number
    name: string
    phoneNumber?: string
    organisation?: string
    primaryAddress: boolean
}

export interface IUserPasswordChange {
    currentPassword: string
    newPassword: string
}
