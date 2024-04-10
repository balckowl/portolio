"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const SignInPage = () => {

    const { data: session, status } = useSession()

    useEffect(() => {
        if (session) {
            router.push(`/${session.user?.id}`)
        }
    }, [session])

    const router = useRouter()

    const signInWithGitHub = async () => {

        await signIn("github")
    }

    if(status === "loading"){
        return <div>Loading...</div>
    }

    return (
        <div className="h-[calc(100vh-80px)]">
            <div className="container flex items-center h-full justify-center flex-col">
                <h2 className="text-center text-[30px] font-bold">SignIn To Portolio</h2>
                <Image src="/images/sign-in/sign-in.png" width={200} height={200} alt="sign-in" />
                <form action={signInWithGitHub}>
                    <Button >
                        GitHubでログインする
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SignInPage