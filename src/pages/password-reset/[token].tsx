import AuthSessionStatus from 'components/AuthSessionStatus'
import AuthValidationErrors from 'components/AuthValidationErrors'
import type { Email } from 'types/auth'
import GuestLayout from 'components/Layouts/GuestLayout'
import type { Status } from 'types/status'
import { useAuth } from 'hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const PasswordReset = () => {
    const router = useRouter()

    const { resetPassword } = useAuth({ middleware: 'guest' })

    const [email, setEmail] = useState<Email>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
    const [errors, setErrors] = useState<string[]>([])
    const [status, setStatus] = useState<Status>(null)

    const submitForm = (event: { preventDefault: () => void; }) => {
        event.preventDefault()

        resetPassword({
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
            setStatus,
        })
    }

    useEffect(() => {
        setEmail(router.query.email || '')
    }, [router.query.email])

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
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="passwordConfirmation">
                        Confirm Password
                    </label>
                    <input
                        id="passwordConfirmation"
                        type="password"
                        value={passwordConfirmation}
                        onChange={event => setPasswordConfirmation(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <button type="submit">Reset Password</button>
                </div>
            </form>
        </GuestLayout>
    )
}

export default PasswordReset
