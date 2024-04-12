
import NotFound from "@/app/not-found"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { authOptions } from "@/lib/next-auth/options"
import { Twitter } from "lucide-react"
import { getServerSession } from "next-auth"

import Link from "next/link"

const getUserProfile = async (userId: string) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${userId}`)

    if(!res.ok){
        return {}
    }

    const data = await res.json()

    return data
}

const Hero = async ({ userId }: { userId: string }) => {

    const session = await getServerSession(authOptions)

    const userProfile = await getUserProfile(userId)

    console.log(userProfile)

    if(Object.keys(userProfile).length == 0){
        return <NotFound />
    }

    return (
        <div className="h-[400px] lg:h-[300px]">
            <div className="h-full container flex justify-center border-b-[2px] border-[#eee]">
                <div className="w-full sm:w-[80%] flex flex-col lg:flex-row items-end lg:items-center justify-center lg:justify-between">
                    <div className="w-full lg:w-[70%] flex flex-col lg:flex-row items-center gap-8 mb-[15px] lg:mb-0">
                        <Avatar className="w-[100px] h-[100px]">
                            <AvatarImage src={userProfile.photo_url} alt={userProfile.username} />
                            <AvatarFallback>{userProfile.username}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-[30px] font-bold">{userProfile.username}</h2>
                                {userProfile.X &&
                                    <a href={`https://twitter.com/${userProfile.X}`}>
                                        <Twitter />
                                    </a>
                                }
                            </div>
                            <p className="text-[13px] sm:text-[16px]">{userProfile.bio}</p>
                        </div>
                    </div>
                    {session?.user?.uid === userId && (
                        <Link href={`/${session?.user?.uid}/edit`}>
                            <Button>
                                編集する
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Hero