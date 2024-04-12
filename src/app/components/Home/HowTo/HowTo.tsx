import { Pickaxe } from "lucide-react"
import Image from "next/image"

const HowTo = () => {
    return (
        <div className="pt-[140px] pb-[140px] bg-[#eee]">
            <div className="container flex justify-center">
                <div className="w-full lg:w-[80%]">
                    <h3 className="text-center text-[30px] lg:text-[39px] font-[700] mb-[30px]">portolioの使い方</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px]">
                        <div className="col-span-1 shadow-md rounded-[10px] p-3 bg-white">
                            <h4 className="text-[30px] text-center">はじめる</h4>
                            <div>
                                <Image src="/images/howto/door.png" width={200} height={200} alt="write" className="mx-auto" />
                            </div>
                            <p className="text-center">まずはサイトにログインをしよう</p>
                        </div>
                        <div className="col-span-1 shadow-md rounded-[10px] p-3 bg-white">
                            <h4 className="text-[30px] text-center">記事を書く</h4>
                            <div>
                                <Image src="/images/howto/write.png" width={200} height={200} alt="write" className="mx-auto" />
                            </div>
                            <p className="text-center">挫折した作品についての記事を書こう</p>
                        </div>
                        <div className="col-span-1 shadow-md rounded-[10px] p-3 bg-white">
                            <h4 className="text-[30px] text-center">投稿する</h4>
                            <div>
                                <Image src="/images/howto/post.png" width={200} height={200} alt="write" className="mx-auto" />
                            </div>
                            <p className="text-center">かけた記事を皆に見せよう</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowTo
