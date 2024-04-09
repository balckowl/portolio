import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Hero = () => {
    return (
        <div className="h-[300px]">
            <div className="h-full container flex justify-center border-b-[2px] border-[#eee]">
                <div className="w-[80%] flex items-center justify-between">
                    <div className="w-[70%] flex items-center gap-8">
                        <Avatar className="w-[100px] h-[100px]">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-[30px] font-bold">ゆーた</h2>
                            <p>青山学院大学大学院１年 | フロントエンドエンジニア | React, Next.js,  Remix | ITパスポート勉強中</p>
                        </div>
                    </div>
                    <Link href="/y_ta/edit">
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