import GuestLayout from 'components/Layouts/GuestLayout'
import type { Status } from 'types/status'
import { useAuth } from 'hooks/auth'
import { useState } from 'react'

const VerifyEmail = () => {
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
    })

    const [status, setStatus] = useState<Status>(null)

    return (
        <GuestLayout>
            <div>
                Thanks for signing up! Before getting started, could you
                verify your email address by clicking on the link we just
                emailed to you? If you didn&apos;t receive the email, we will
                gladly send you another.
            </div>

            {status === 'verification-link-sent' && (
                <div>
                    A new verification link has been sent to the email
                    address you provided during registration.
                </div>
            )}

            <div>
                <button
                    type="button"
                    onClick={() => resendEmailVerification({ setStatus })}>
                    Resend Verification Email
                </button>

                <button
                    type="button"
                    onClick={logout}>
                    Logout
                </button>
            </div>
        </GuestLayout>
    )
}

export default VerifyEmail
