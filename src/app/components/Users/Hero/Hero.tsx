import { auth } from "../../../../auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Twitter } from "lucide-react"

import Link from "next/link"

const Hero = async () => {

    const session = await auth()

    return (
        <div className="h-[400px] lg:h-[300px]">
            <div className="h-full container flex justify-center border-b-[2px] border-[#eee]">
                <div className="w-full sm:w-[80%] flex flex-col lg:flex-row items-end lg:items-center justify-center lg:justify-between">
                    <div className="w-full lg:w-[70%] flex flex-col lg:flex-row items-center gap-8 mb-[15px] lg:mb-0">
                        <Avatar className="w-[100px] h-[100px]">
                            {session?.user?.image && (
                                <AvatarImage src={session.user.image} alt={session.user.name ?? ""} />
                            )}
                            <AvatarFallback>{session?.user?.email}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-3">
                                {session?.user?.name && (
                                    <h2 className="text-[30px] font-bold">{session.user.name}</h2>
                                )}
                                <Link href="/twitter/y_ta">
                                    <Twitter />
                                </Link>
                            </div>
                            <p className="text-[13px] sm:text-[16px]">青山学院大学大学院１年 | フロントエンドエンジニア | React, Next.js,  Remix | ITパスポート勉強中</p>
                        </div>
                    </div>
                    <Link href={`/${session?.user?.id}/edit`}>
                        <Button>
                            編集する
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero