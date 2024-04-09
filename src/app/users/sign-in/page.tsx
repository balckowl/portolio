import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const SignInPage = () => {
    return (
        <div className="h-[calc(100vh-80px)]">
            <div className="container flex items-center h-full justify-center flex-col">
                <h2 className="text-center text-[30px] font-bold">SignIn To Portolio</h2>
                <Image src="/images/sign-in/sign-in.png" width={200} height={200} alt="sign-in" />
                <Button>
                    <Link href="/y_ta">GitHubでログインする</Link>
                </Button>
            </div>
        </div>
    )
}

export default SignInPage