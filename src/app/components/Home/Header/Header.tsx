import { auth, signOut } from "../../../../auth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlignJustify } from "lucide-react";

const Header = async () => {

    const session = await auth()

    const logOut = async () => {
        "use server"

        await signOut({ redirectTo: '/' })
    }

    return (
        <div className="h-[80px]">
            <div className="container flex justify-between h-full items-center">
                <h1 className="text-4xl font-bold">
                    <Link href="/">Portolio</Link>
                </h1>
                {!session ? (
                    <Button>
                        <Link href="/users/sign-in">
                            はじめる
                        </Link>
                    </Button>
                ) : (
                    <>
                        <div className="block lg:hidden">
                            <Sheet>
                                <SheetTrigger>
                                    <AlignJustify />
                                </SheetTrigger>
                                <SheetContent>
                                    <div className="flex items-center gap-5">
                                        <Avatar>
                                            {session?.user?.image && (
                                                <AvatarImage src={session?.user?.image} alt={session?.user?.name ?? ""} />
                                            )}
                                            <AvatarFallback>{session?.user?.name}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            {session?.user?.name}
                                        </div>
                                    </div>
                                    <div>
                                        <ul className="p-4 flex flex-col gap-5">
                                            <Link href={`/${session?.user?.id}`}>
                                                <li>My Portolio</li>
                                            </Link>
                                            <Link href={`/${session?.user?.id}/edit`}>
                                                <li>プロフィール設定</li>
                                            </Link>
                                            <Link href={`/posts/edit`}>
                                                <li>記事を投稿</li>
                                            </Link>
                                            <form action={logOut}>
                                                <button>
                                                    <li>ログアウト</li>
                                                </button>
                                            </form>
                                        </ul>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                        <div className="lg:flex items-center gap-10 hidden">
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar>
                                        {session?.user?.image && (
                                            <AvatarImage src={session?.user?.image} alt={session?.user?.name ?? ""} />
                                        )}
                                        <AvatarFallback>{session?.user?.name}</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <h2 className="p-4 border-b-[1px] border-[#eee] font-bold">{session?.user?.name}</h2>
                                    <ul className="p-4 flex flex-col gap-3">
                                        <Link href={`/${session?.user?.id}`}>
                                            <li>My Portolio</li>
                                        </Link>
                                        <Link href={`/${session?.user?.id}/edit`}>
                                            <li>プロフィール設定</li>
                                        </Link>
                                        <form action={logOut}>
                                            <button>
                                                <li>ログアウト</li>
                                            </button>
                                        </form>
                                    </ul>
                                </PopoverContent>
                            </Popover>
                            <Link href="/posts/edit">
                                <Button>
                                    投稿する
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header