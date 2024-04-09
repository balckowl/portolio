import Link from "next/link"

const PostList = () => {
    return (
        <div className="py-[90px] lg:py-[140px]">
            <div className="container flex justify-center">
                <div className="w-full lg:w-[80%]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="col-span-1 border-[1px] border-[#eee] rounded-[5px] bg-[#eee]">
                            <Link href="/posts/kkkss">
                                <div className="text-center py-5">
                                    <span className="text-[50px]">🔥</span>
                                </div>
                                <div className="bg-white py-5 text-center">
                                    <h2 className="text-[20px] font-bold">失敗は最高の成功</h2>
                                </div>
                            </Link>
                        </div>
                        <div className="col-span-1 border-[1px] border-[#eee] rounded-[5px] bg-[#eee]">
                            <div className="text-center py-5">
                                <span className="text-[50px]">🥺</span>
                            </div>
                            <div className="bg-white py-5 text-center">
                                <h2 className="text-[20px] font-bold">失敗は最高の成功</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostList