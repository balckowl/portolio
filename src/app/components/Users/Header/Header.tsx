"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify } from "lucide-react"
import Link from "next/link"
import { signOut as signOutNextAuth, useSession } from "next-auth/react";
import { signOut as signOutFirebase } from "firebase/auth";
import { auth } from "@/lib/firebase/client"
import Image from "next/image"




const Header = () => {

    const { data: session } = useSession()

    const logOut = async () => {
        await signOutFirebase(auth)
        signOutNextAuth({ callbackUrl: "/" })
    }

    return (
        <div className="h-[60px] bg-white">
            <div className="container flex justify-between h-full items-center">
                <h1 className="text-4xl font-bold">
                    <Link href="/">
                        <Image src={"/images/logo/logo.png"} width={160} height={50} alt={"logo"} />
                    </Link>
                </h1>
                {session ? (
                    <div>
                        <div className="block lg:hidden">
                            <Sheet>
                                <SheetTrigger>
                                    <AlignJustify />
                                </SheetTrigger>
                                <SheetContent>
                                    <div className="flex items-center gap-5">
                                        <Avatar>
                                            {session?.user?.photoURL && (
                                                <AvatarImage src={session?.user?.photoURL} alt={session?.user?.name ?? ""} />
                                            )}
                                            <AvatarFallback>{session?.user?.name}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            {session?.user?.name}
                                        </div>
                                    </div>
                                    <div>
                                        <ul className="p-4 flex flex-col gap-5">
                                            <Link href={`/${session?.user?.uid}`}>
                                                <li>My Portolio</li>
                                            </Link>
                                            <Link href={`/${session?.user?.uid}/edit`}>
                                                <li>プロフィール設定</li>
                                            </Link>
                                            <Link href={`/posts/edit`}>
                                                <li>記事を書く</li>
                                            </Link>
                                            <div onClick={logOut} className="cursor-pointer">
                                                <li>ログアウト</li>
                                            </div>
                                        </ul>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                        <div className="lg:flex items-center gap-10 hidden">
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar>
                                        {session?.user?.photoURL && (
                                            <AvatarImage src={session?.user?.photoURL} alt={session?.user?.name ?? ""} />
                                        )}
                                        <AvatarFallback>{session?.user?.name}</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <h2 className="p-4 border-b-[1px] border-[#eee] font-bold">{session?.user?.name}</h2>
                                    <ul className="p-4 flex flex-col gap-3">
                                        <Link href={`/${session?.user?.uid}`}>
                                            <li>My Portolio</li>
                                        </Link>
                                        <Link href={`/${session?.user?.uid}/edit`}>
                                            <li>プロフィール設定</li>
                                        </Link>
                                        <div onClick={logOut} className="cursor-pointer">
                                            <li>ログアウト</li>
                                        </div>
                                    </ul>
                                </PopoverContent>
                            </Popover>
                            <Link href="/posts/edit">
                                <Button>
                                    記事を書く
                                </Button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <Link href="/users/sign-in">
                        <Button>
                            はじめよう
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Header