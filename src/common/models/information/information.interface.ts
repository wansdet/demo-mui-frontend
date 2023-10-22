export interface IInformation {
    id?: number
    informationId: string
    title: string
    subTitle?: string
    information: string
    informationType: string
    active: boolean
    sortOrder: number
    createdBy: string
    createdAt: Date
    updatedBy?: string
    updatedAt?: Date
}
