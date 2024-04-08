import { Button } from "@/components/ui/button"
import Image from "next/image"

const Hero = () => {
    return (
        <div className="h-[500px] bg-[#eee]">
            <div className="container flex justify-center h-full items-center">
                <div className="w-[80%] flex items-center">
                    <div className="w-1/2 space-y-4">
                        <h2 className="text-[45px] font-bold">失敗したものだって<br />アピールポイント</h2>
                        <p>挫折ポートフォリオ</p>
                        <Button>はじめる</Button>
                    </div>
                    <div className="w-1/2">
                        <Image src="/images/hero/hero.png" width={500} height={500} alt="hero" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero