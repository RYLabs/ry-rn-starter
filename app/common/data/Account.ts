export interface Account {
    firstName: string
    lastName: string
    email: string
    password?: string
    dob?: string
    maximumOpps?: number
    status?: Status
    statusMessage?: any
    id?: number
    rating?: number
    stripeConnected: boolean
    completedOnboarding: boolean
    pendingOpps?: number
}

export enum Status {
    Valid = "account_valid",
    Warning = "account_warning",
    Banned = "account_banned",
    Suspended = "account_suspended",
    AccountPostProvisional = "account_post_provisional",
}