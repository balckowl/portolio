"use client"
import ReactMarkdown from "react-markdown"
import "../Editer/Edit.css"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, RefreshCw } from "lucide-react"

const Article = () => {
    return (
        <div className="py-[100px]">
            <div className="container flex justify-center">
                <div className="w-[60%]">
                    <div className="mb-[10px]">
                        <h2 className="text-[30px] font-bold">Reactはなぜ人気なのか？</h2>
                    </div>
                    <div className="h-[400px] bg-white p-5 rounded-[5px]">
                        <div className="border-[1px] border-[#eee] rounded-[5px] flex justify-between p-3 mb-[10px]">
                            <div className="flex items-center gap-3">
                                <div>2023/2/11</div>
                                <div className="flex items-center gap-1">
                                    <RefreshCw width={18} height={18} />
                                    <div>2024/2/11</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p>ゆーた</p>
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