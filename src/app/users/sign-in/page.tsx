"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { signInWithPopup, GithubAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase/client"
import Loading from "@/app/loading"

const SignInPage = () => {

    const { data: session, status } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const githubProvider = new GithubAuthProvider


    const signInWithGitHub = async () => {

        setIsLoading(true)

        await signInWithPopup(auth, githubProvider).then(async (credential) => {

            const idToken = await credential.user.getIdToken(true)

            //そういうユーザーがいないかを調べる

            //存在しなければ作る
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id: credential.user.uid, username: credential.user.displayName, photo_url: credential.user.photoURL })
            })

            signIn("credentials", { idToken, callbackUrl: `/${credential.user.uid}` })

        })
    }

    if(isLoading){
        return <Loading />
    }

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