"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ReactMarkdown from 'react-markdown'
import "./Edit.css"


const Editer = ({ title, content, setTitle, setContent }: { title: string, content: string, setTitle: Function, setContent: Function }) => {
    return (
        <div className="py-[100px]">
            <div className="container flex justify-center">
                <Tabs className="w-[60%]" defaultValue="markdown">
                    <div className="mb-[5px]">
                        <input type="text" placeholder="ここにタイトルを入力してください。" className="w-full bg-[#eee] focus:outline-none text-[30px]" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-[10px]">
                        <TabsContent value="markdown">
                            <div className="h-[400px] bg-white p-5 rounded-[5px]">
                                <textarea name="" className="h-full w-full focus:outline-none resize-none" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                            </div>
                        </TabsContent>
                        <TabsContent value="password">
                            <div className={`preview min-h-[400px] bg-white px-8 py-5 rounded-[5px]`}>
                                <ReactMarkdown>{content}</ReactMarkdown>
                            </div>
                        </TabsContent>
                    </div>
                    <div className="flex justify-end">
                        <TabsList>
                            <TabsTrigger value="markdown">Markdown</TabsTrigger>
                            <TabsTrigger value="password">Preview</TabsTrigger>
                        </TabsList>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

export default Editer