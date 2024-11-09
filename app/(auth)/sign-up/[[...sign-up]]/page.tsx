// zoom_clone/app/(auth)/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => { 
    return (
        <main className="flex h-screen w-full items-center justify-center">
            <SignUp />
        </main>
    )
}

export default SignUpPage;