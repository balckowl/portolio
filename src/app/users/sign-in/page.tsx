"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const SignInPage = () => {

    const { data: session, status } = useSession()

    const createUser = async () => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id: session?.user?.id, username: session?.user?.name, photo_url: session?.user?.image })
        })

        const data = await res.json()

        console.log(data)

        router.push(`/${session?.user?.id}`)
    }

    console.log(session?.user?.id)


    useEffect(() => {
        if (session) {
            createUser()
        }
    }, [session])

    const router = useRouter()

    const signInWithGitHub = async () => {

        await signIn("github")
    }

    // if (status === "loading") {
    //     return <div>Loading...</div>
    // }

    return (
        <div className="h-[calc(100vh-80px)]">
            <div className="container flex items-center h-full justify-center flex-col">
                <h2 className="text-center text-[30px] font-bold">SignIn To Portolio</h2>
                <Image src="/images/sign-in/sign-in.png" width={200} height={200} alt="sign-in" />
                <Button onClick={signInWithGitHub}>
                    GitHubでログインする
                </Button>
            </div>
        </div>
    )
}

export default SignInPage