"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "prism-themes/themes/prism-one-light.min.css"
import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs'
import { marked } from "marked"
import 'prism-themes/themes/prism-nord.min.css'
import "./Edit.css"
import { useEffect, useState } from "react";


const Editer = ({ title, content, setTitle, setContent }: { title: string, content: string, setTitle: Function, setContent: Function }) => {

    const [change, setChange] = useState<number>(0)

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
                            <div className="h-[400px] bg-white p-5 rounded-[5px]">
                                <textarea name="" className="h-full w-full focus:outline-none resize-none" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
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
                    <div className="flex justify-end">
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