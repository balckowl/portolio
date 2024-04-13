"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReactMarkdown from 'react-markdown'
import "./Edit.css"
import { ChangeEvent, useState } from "react";
import { CircleHelp, Image } from "lucide-react"
import Link from "next/link"
import { storage } from "../../../../lib/firebase/client";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';


interface CodeBlockProps {
    value?: string;
    language?: string;
}

const CodeBlock = ({ value = '', language = 'javascript' }: CodeBlockProps) => {
    return (
        <SyntaxHighlighter language={language} style={oneLight}>
            {value}
        </SyntaxHighlighter>
    );
};


const Editer = ({ title, content, setTitle, setContent }: { title: string, content: string, setTitle: Function, setContent: Function }) => {

    const [change, setChange] = useState<number>(0)

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files) {
            const file = e.target.files[0]

            const storageRef = ref(storage, `images/${file?.name}`);

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

    return (
        <div className="py-[100px] flex justify-center min-h-[calc(100vh-80px-60px)]">
            <div className="w-[92%] sm:container flex justify-center">
                <Tabs className="w-full lg:w-[60%]" defaultValue="markdown">
                    <div className="mb-[5px]">
                        <input type="text" placeholder="ここにタイトルを入力してください。" className="w-full bg-[#eee] focus:outline-none text-[18px] md:text-[25px] lg:text-[30px]" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-[10px]">
                        <TabsContent value="markdown">
                            <div className="h-[400px] bg-white p-5 rounded-[5px] relative w-full">
                                <textarea name="" className="h-full w-full focus:outline-none resize-none" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                                <div onClick={() => document.getElementById('file-input')?.click()} className="bg-yellow-200 w-12 h-12 flex items-center justify-center absolute bottom-[10px] right-[10px] rounded-full cursor-pointer">
                                    <Image />
                                    <input type="file" id="file-input" className="hidden" onChange={handleImageChange} accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png" />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="password">
                            <div className={`preview min-h-[400px] bg-white px-8 py-5 rounded-[5px] w-full`}>
                                <ReactMarkdown
                                    components={{
                                        code({ node, className, children, ...props }) {
                                            return <CodeBlock value={String(children)} {...props} />;
                                        }
                                    }}
                                >
                                    {content}
                                </ReactMarkdown>
                            </div>
                        </TabsContent>
                    </div>
                    <div className="flex justify-end items-center gap-3">
                        <Link href="/posts/2" target="_blank">
                            <div className="bg-white py-2 px-2 flex items-center gap-3 cursor-pointer rounded-[10px]">
                                <CircleHelp width={20} height={20} />
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