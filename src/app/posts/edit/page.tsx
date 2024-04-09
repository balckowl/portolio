"use client"
import Editer from "@/app/components/Posts/Editer/Editer"
import Header from "@/app/components/Posts/Header/Header"
import { useState } from "react"

const EditPage = () => {

    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [url, setUrl] = useState<string>("")

    return (
        <div className="bg-[#eee] min-h-screen">
            <Header title={title} content={content}/>
            <Editer title={title} content={content} setTitle={setTitle} setContent={setContent}/>
        </div>
    )
}

export default EditPage