import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const Hero = () => {
    return (
        <div className="h-[300px]">
            <div className="h-full container flex justify-center border-b-[2px] border-[#eee]">
                <div className="w-[80%] flex items-center justify-between">
                    <div className="w-[70%] flex items-center gap-5">
                        <Avatar className="w-[100px] h-[100px]">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-[30px] font-bold">ゆーた</h2>
                            <p>青山学院大学大学院１年 | フロントエンドエンジニア | React, Next.js,  Remix | ITパスポート勉強中</p>
                        </div>
                    </div>
                    <Button>編集する</Button>
                </div>
            </div>
        </div>
    )
}

export default Hero