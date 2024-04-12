"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs'
import { marked } from "marked"
import "./Edit.css"
import { ChangeEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { CircleHelp, Image } from "lucide-react"
import Link from "next/link"
import { storage } from "../../../../lib/firebase/client";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";



const Editer = ({ title, content, setTitle, setContent }: { title: string, content: string, setTitle: Function, setContent: Function }) => {

    const [change, setChange] = useState<number>(0)

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files) {
            const file = e.target.files[0]

            const storageRef =  ref(storage, `images/${file?.name}`);

            if (file) {
                await uploadBytes(storageRef, file).then(() => {
                    console.log('Uploaded a blob or file!');
                })
            }

            const url = await getDownloadURL(storageRef)

            const imageMarkdown = `![](${url})`

            setContent(content + imageMarkdown)
        }
    }

    useEffect(() => {
        Prism.highlightAll()
    }, [change, title])

    return (
        <div className="py-[100px] flex justify-center">
            <div className="w-[92%] sm:container flex justify-center">
                <Tabs className="w-full lg:w-[60%]" defaultValue="markdown">
                    <div className="mb-[5px]">
                        <input type="text" placeholder="ここにタイトルを入力してください。" className="w-full bg-[#eee] focus:outline-none text-[18px] md:text-[25px] lg:text-[30px]" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-[10px]">
                        <TabsContent value="markdown">
                            <div className="h-[400px] bg-white p-5 rounded-[5px] relative">
                                <textarea name="" className="h-full w-full focus:outline-none resize-none" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                                <div onClick={() => document.getElementById('file-input')?.click()} className="bg-yellow-200 w-12 h-12 flex items-center justify-center absolute bottom-[10px] right-[10px] rounded-full cursor-pointer">
                                    <Image />
                                    <input type="file" id="file-input" className="hidden" onChange={handleImageChange} />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="password">
                            <div className={`preview min-h-[400px] bg-white px-8 py-5 rounded-[5px]`}>
                                <div dangerouslySetInnerHTML={{ __html: marked.parse(content) }} className='post-text-box line-numbers language-javascript' />
                                {/* <ReactMarkdown>
                                    {content}
                                </ReactMarkdown> */}
                            </div>
                        </TabsContent>
                    </div>
                    <div className="flex justify-end items-center gap-3">
                        <Link href="/posts/18">
                            <div className="bg-white py-1 px-3 flex items-center gap-3 cursor-pointer">
                                <CircleHelp width={20} height={20} />
                                <p>このサイトで使えるマークダウン</p>
                            </div>
                        </Link>
                        <TabsList>
                            <TabsTrigger value="markdown" onClick={() => setChange(1)}>Markdown</TabsTrigger>
                            <TabsTrigger value="password" onClick={() => setChange(2)}>Preview</TabsTrigger>
                        </TabsList>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

export default Editer