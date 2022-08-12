import type { SetErrors, SetStatus } from 'types/state'
 
export type Props = {
    middleware?: string
    redirectIfAuthenticated?: string
}

export type Register = (
    params: {
        name: string
        email: string
        password: string
        password_confirmation: string
        setErrors: SetErrors
    }
) => Promise<void>

export type Login = (
    params: {
        setErrors: SetErrors
        setStatus: SetStatus
        email: string
        password: string
    }
) => Promise<void>

export type ForgotPassword = (
    params: {
        setErrors: SetErrors
        setStatus: SetStatus
        email: String
    }
) => Promise<void>

export type ResetPassword = (
    params: {
        setErrors: SetErrors
        setStatus: SetStatus
        email: string
        password: string
        password_confirmation: string
    }
) => Promise<void>

export type ResendEmailVerification = (
    params: {
        setStatus: SetStatus
    }
) => void
