"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from "@/components/ui/textarea"
import toast, { Toaster } from "react-hot-toast"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const formShema = z.object({
    name: z.string().min(2, { message: "名前は2文字以上にしてください" }).max(6, { message: "名前は6文字以下にしてください" }),
    bio: z.string().max(100, { message: "100文字以下で入力してください。" }),
    x: z.string()
})

type formType = z.infer<typeof formShema>

const Profile = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [profileData, setProfileData] = useState({ name: "", bio: "", x: "" });
    const { data: session, status } = useSession()

    const router = useRouter()

    const getUserProfile = async (userId: string) => {

        setIsSubmitting(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${userId}`)

        const data = await res.json()

        setProfileData({ name: data.username, bio: data.bio, x: data.X })
        setIsSubmitting(true)
        console.log(profileData)
    }

    useEffect(() => {
        if (session) {
            getUserProfile(String(session?.user?.id))
        }
    }, [session])

    useEffect(() => {
        form.reset(profileData)
    }, [profileData])


    const form = useForm<formType>({
        resolver: zodResolver(formShema),
        defaultValues: profileData
    })

    const onSubmit = async (formData: formType) => {

        setIsLoading(true)

        const loading = toast.loading("送信中...")

        const { name, x, bio } = formData

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${session?.user?.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: name, X: x, bio: bio })
        })

        const data = await res.json()

        toast.dismiss(loading)
        setIsLoading(false)
        toast.success("更新完了")
        router.push(`/${session?.user?.id}`)
        //ページ遷移後、リフレッシュ
        router.refresh()

        return data

        // setTimeout(() => {
        //     toast.dismiss(loading)
        //     setIsLoading(false)
        //     toast.success("更新完了")
        //     form.reset()
        // }, 3000)
    }

    if (!isSubmitting) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="container flex justify-center">
                <Toaster />
                <div className="w-full lg:w-[60%] pb-[100px]">
                    <div className="py-[30px]">
                        <h2 className="text-[30px] font-bold text-center">Profile</h2>
                    </div>
                    <div className="bg-white lg:flex px-5 py-10 gap-3 rounded-[5px]">
                        <div className="w-full lg:w-[30%] flex justify-center ">
                            <Avatar className="w-[100px] h-[100px]">
                                {status === "authenticated" && session?.user?.image && (
                                    <AvatarImage src={session.user.image} alt={session.user.name ?? ""} />
                                )}
                                <AvatarFallback>{session?.user?.email}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="w-full lg:w-[60%]">
                            <Form {...form}>
                                <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>名前</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="ゆーた" {...field} className="focus:outline-none" disabled={isLoading} />
                                                </FormControl>
                                                <FormDescription>
                                                    サービスで表示する名前を入力してください
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="bio"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Bio欄</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="青山学院大学の大学生です。" {...field} className="resize-none h-[200px] focus:outline-none" disabled={isLoading} />
                                                </FormControl>
                                                <FormDescription>
                                                    Bio欄に表示される内容を入力してください
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="x"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Xリンク</FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center gap-2">
                                                        <div>https://twitter.com/</div>
                                                        <Input placeholder="y_ta" {...field} className="focus:outline-none" disabled={isLoading} />
                                                    </div>
                                                </FormControl>
                                                <FormDescription>
                                                    X(旧Twitter)のユーザー名を入力してください
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" disabled={isLoading}>Submit</Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile