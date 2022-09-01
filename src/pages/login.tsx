import AuthSessionStatus from 'components/AuthSessionStatus'
import AuthValidationErrors from 'components/AuthValidationErrors'
import type { Email } from 'types/auth'
import GuestLayout from 'components/Layouts/GuestLayout'
import Link from 'next/link'
import type { NextPage } from 'next'
import type { Status } from 'types/status'
import { useAuth } from 'hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Login: NextPage = () => {
    const router = useRouter()

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/home',
    })

    const [email, setEmail] = useState<Email>('')
    const [password, setPassword] = useState<string>('')
    const [errors, setErrors] = useState<string[]>([])
    const [status, setStatus] = useState<Status>(null)

    useEffect(() => {
        const query = router.query.reset?.toString()
        if (query && query.length > 0 && errors.length === 0) {
            setStatus(decodeURIComponent(encodeURI(window.atob(query))))
        } else {
            setStatus(null)
        }
    }, [router, errors])

    const submitForm = (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        login({ email, password, setErrors, setStatus })
    }

    return (
        <GuestLayout>
            {/* Session Status */}
            <AuthSessionStatus status={status} />

            {/* Validation Errors */}
            <AuthValidationErrors errors={errors} />

            <form onSubmit={submitForm}>
                {/* Email Address */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        required
                        autoFocus
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>

                {/* Remember Me */}
                <div>
                    <label htmlFor="remember_me">
                        <input
                            id="remember_me"
                            type="checkbox"
                            name="remember"
                        />

                        <span>Remember me</span>
                    </label>
                </div>

                <div>
                    <Link href="/forgot-password">
                        <a>Forgot your password?</a>
                    </Link>

                    <button type="submit">Login</button>
                </div>
            </form>
        </GuestLayout>
    )
}

export default Login
