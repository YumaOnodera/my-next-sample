import axios from 'libs/axios'
import useSWR from 'swr'
import { objectValuesToString } from 'utils/format'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { Props, Register, Login, ForgotPassword, ResetPassword, ResendEmailVerification } from 'types/auth'

export const useAuth = (props?: Props) => {

    const router = useRouter()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register: Register = async ({setErrors, ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(objectValuesToString(error.response.data.errors))
            })
    }

    const login: Login = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(objectValuesToString(error.response.data.errors))
            })
    }

    const forgotPassword: ForgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(objectValuesToString(error.response.data.errors))
            })
    }

    const resetPassword: ResetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: router.query.token, ...props })
            .then(response => router.push('/login?reset=' + btoa(response.data.status)))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(objectValuesToString(error.response.data.errors))
            })
    }

    const resendEmailVerification: ResendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (! error) {
            await axios
                .post('/logout')
                .then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (props?.middleware === 'guest' && props.redirectIfAuthenticated && user) router.push(props.redirectIfAuthenticated)
        if (props?.middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}