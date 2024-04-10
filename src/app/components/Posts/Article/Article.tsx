"use client"
import ReactMarkdown from "react-markdown"
import "../Editer/Edit.css"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, RefreshCw } from "lucide-react"
import { useSession } from "next-auth/react"

const Article = () => {

    const { data: session, status } = useSession()

    console.log(session)

    // if(status === "loading"){
    //     return <div>loading</div>
    // }

    return (
        <div className="py-[100px] flex justify-center">
            <div className="w-[92%] sm:container flex justify-center">
                <div className="w-full lg:w-[60%]">
                    <div className="mb-[10px]">
                        <h2 className="text-[20px] sm:text-[25px] lg:text-[30px] font-bold">Next.jsのApp Routerを挫折した話</h2>
                    </div>
                    <div className="min-h-[400px] bg-white p-5 rounded-[5px]">
                        <div className="border-[1px] border-[#eee] rounded-[5px] flex justify-between p-3 mb-[10px]">
                            <div className="flex-col sm:flex-row flex sm:items-center sm:gap-3">
                                <div className="text-[13px]">2023/2/11</div>
                                <div className="flex items-center gap-1 text-[13px]">
                                    <RefreshCw width={18} height={18} />
                                    <div>2024/2/11</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    {status === "authenticated" && session?.user?.image ? (
                                        <AvatarImage src={session?.user.image} alt={session?.user.name ?? ""} />
                                    ) : (<></>)}
                                    <AvatarFallback>{session?.user?.email}</AvatarFallback>
                                </Avatar>
                                <p className="hidden sm:block">{session?.user?.name}</p>
                            </div>
                        </div>
                        <div className="preview">
                            <ReactMarkdown>
                                # 導入
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article