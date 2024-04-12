"use client"
import ReactMarkdown from "react-markdown"
import "../Editer/Edit.css"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CircleHelp, Image, RefreshCw } from "lucide-react"
import { useSession } from "next-auth/react"
import { notFound, useParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import Loading from "@/app/loading"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Toaster, toast } from "react-hot-toast"
import { marked } from "marked"
import Prism from 'prismjs'
import "prism-themes/themes/prism-one-light.min.css"
import NotFound from "../../../not-found"
import Link from "next/link"
import { storage } from "@/lib/firebase/client"
import { getDownloadURL, uploadBytes, ref } from "firebase/storage"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PostDataType {
    post_id?: number,
    title?: string,
    description?: string,
    icon?: string,
    created_at?: string,
    updated_at?: string,
    user_id?: string,
    username?: string,
    usericon?: string,
}


const Article = () => {

    const params = useParams()
    const router = useRouter()
    const { id } = params

    const { data: session, status } = useSession()
    const [isLoading, setIsLoading] = useState(true)
    const [postData, setPostData] = useState<PostDataType | any>({})
    const [isEditting, setIsEditting] = useState<boolean>(false)

    let createdAt: Date;

    let updateCYear: number;
    let updateCMonth: number;
    let updateCDate: number;
    const [cYear, setCYear] = useState<number>(0)
    const [cMonth, setCMonth] = useState<number>(0)
    const [cDate, setCDate] = useState<number>(0)

    let updateUYear: number;
    let updateUMonth: number;
    let updateUDate: number;
    const [uYear, setUYear] = useState<number>(0)
    const [uMonth, setUMonth] = useState<number>(0)
    const [uDate, setUDate] = useState<number>(0)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        Prism.highlightAll()
    })

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

            setDescription(description + imageMarkdown)
        }
    }

    const getDetailPost = async (id: number) => {

        setIsLoading(true)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/${id}`)

        if (!res.ok) {
            setPostData({})
            setIsLoading(false)
            return
        }

        const data = await res.json()

        setPostData(data)

        setTitle(data.title)
        setDescription(data.description)

        createdAt = new Date(data.created_date)

        updateCYear = createdAt.getFullYear()
        updateCMonth = createdAt.getMonth()
        updateCDate = createdAt.getDate()

        updateUYear = createdAt.getFullYear()
        updateUMonth = createdAt.getMonth()
        updateUDate = createdAt.getDate()

        setCYear(updateCYear)
        setCMonth(updateCMonth)
        setCDate(updateCDate)

        setUYear(updateUYear)
        setUMonth(updateUMonth)
        setUDate(updateUDate)

        setIsLoading(false)
        console.log(data)
    }

    const updatePost = async () => {

        const loading = toast.loading("送信中...")

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: title, description: description, icon: postData.icon })
        })

        const data = await res.json()

        setIsEditting(false)
        toast.dismiss(loading)
        toast.success("更新完了")
        router.refresh()

        return data
    }

    const deletePost = async () => {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/${id}`, {
            method: "DELETE",
        })

        router.push(`/${session?.user?.uid}`)
        router.refresh()

    }

    useEffect(() => {
        getDetailPost(Number(id))
    }, [])

    if (isLoading) {
        return <Loading />
    }

    console.log(postData)

    if (Object.keys(postData).length === 0) {
        return <NotFound />
    }

    return (
        <div className="py-[100px] flex justify-center">
            <Toaster />
            <Tabs className="w-[92%] sm:container flex justify-center" defaultValue="markdown">
                <div className="w-full lg:w-[60%]">
                    <div className="mb-[10px]">
                        {!isEditting ? (
                            <h2 className="text-[20px] sm:text-[25px] lg:text-[30px] font-bold">{title}</h2>
                        ) : (
                            <input type="text" placeholder="ここにタイトルを入力してください。" className="w-full bg-[#eee] focus:outline-none text-[18px] md:text-[25px] lg:text-[30px]" value={title} onChange={(e) => setTitle(e.target.value)} />
                        )}
                    </div>
                    <div className="min-h-[400px] bg-white p-5 rounded-[5px] mb-[10px]">
                        <div className="border-[1px] border-[#eee] rounded-[5px] flex justify-between p-3 mb-[15px]">
                            <div className="flex-col sm:flex-row flex sm:items-center sm:gap-3">
                                <div className="text-[13px]">{`${cYear}/${cMonth + 1}/${cDate}`}</div>
                                <div className="flex items-center gap-1 text-[13px]">
                                    <RefreshCw width={18} height={18} />
                                    <div>{`${uYear}/${uMonth + 1}/${uDate}`}</div>
                                </div>
                            </div>
                            <Link href={`/${postData.user_id}`}>
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={postData.usericon} alt={postData.username} />
                                        <AvatarFallback>{postData.username}</AvatarFallback>
                                    </Avatar>
                                    <p className="hidden sm:block">{postData.username}</p>
                                </div>
                            </Link>
                        </div>
                        {session?.user?.uid === postData.user_id && (
                            <div className="flex gap-2 justify-end mb-[15px]">
                                {!isEditting ? (
                                    <Button onClick={() => setIsEditting(true)}>編集</Button>
                                ) : (
                                    <Button onClick={updatePost}>更新</Button>
                                )}
                                <Button onClick={deletePost}>削除</Button>
                            </div>
                        )}
                        <div>
                            {!isEditting ? (
                                <div className="preview">
                                    <div dangerouslySetInnerHTML={{ __html: marked.parse(description) }} className='post-text-box line-numbers language-javascript' />
                                    {/* <ReactMarkdown>
                                        {description}
                                    </ReactMarkdown> */}
                                </div>
                            ) : (
                                <div>
                                    <TabsContent className="preview" value="password">
                                        <div dangerouslySetInnerHTML={{ __html: marked.parse(description) }} className='post-text-box line-numbers language-javascript' />
                                        {/* <ReactMarkdown>
                                        {description}
                                    </ReactMarkdown> */}
                                    </TabsContent>
                                    <TabsContent className="relative" value="markdown">
                                        <textarea value={description} className="w-full h-[400px] resize-none focus:outline-none" onChange={(e) => setDescription(e.target.value)}></textarea>
                                        <div onClick={() => document.getElementById('file-input')?.click()} className="bg-yellow-200 w-12 h-12 flex items-center justify-center absolute bottom-[10px] right-[10px] rounded-full cursor-pointer">
                                            <Image />
                                            <input type="file" id="file-input" className="hidden" onChange={handleImageChange} accept=".jpg,.gif,.png,image/gif,image/jpeg,image/png"/>
                                        </div>
                                    </TabsContent>
                                </div>
                            )}
                        </div>
                    </div>
                    {isEditting && (
                        <div className="flex justify-end items-center gap-3">
                            <Link href="/posts/2">
                                <div className="bg-white py-1 px-3 flex items-center gap-3 cursor-pointer rounded-[5px]">
                                    <CircleHelp width={20} height={20} />
                                    <p>このサイトで使えるマークダウン</p>
                                </div>
                            </Link>
                            <TabsList>
                                <TabsTrigger value="markdown" >Markdown</TabsTrigger>
                                <TabsTrigger value="password" >Preview</TabsTrigger>
                            </TabsList>
                        </div>
                    )}
                </div>
            </Tabs>
        </div>
    )
}

export default Article