import {Dispatch, SetStateAction} from "react";
import type { SetErrors, SetStatus } from 'types/state'

export type Email = string | string[]

export type Props = {
    middleware?: string
    redirectIfAuthenticated?: string
}

export type Register = (
    params: {
        name: string
        email: Email
        password: string
        password_confirmation: string
        setErrors: SetErrors
    }
) => Promise<void>

export type CheckDeletedUser = (
    params: {
        email: Email
        password: string
        setIsDeleted: Dispatch<SetStateAction<boolean>>
        setErrors: SetErrors
    }
) => Promise<void>

export type Restore = (
    params: {
        email: Email
        password: string
        setErrors: SetErrors
    }
) => Promise<void>

export type Login = (
    params: {
        setErrors: SetErrors
        setStatus: SetStatus
        email: Email
        password: string
    }
) => Promise<void>

export type ForgotPassword = (
    params: {
        setErrors: SetErrors
        setStatus: SetStatus
        email: Email
    }
) => Promise<void>

export type ResetPassword = (
    params: {
        setErrors: SetErrors
        setStatus: SetStatus
        email: Email
        password: string
        password_confirmation: string
    }
) => Promise<void>

export type ResendEmailVerification = (
    params: {
        setStatus: SetStatus
    }
) => void
