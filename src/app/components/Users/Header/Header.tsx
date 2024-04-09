import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


const Header = () => {
    return (
        <div className="h-[80px]">
            <div className="container flex justify-between h-full items-center">
                <h1 className="text-4xl font-bold">Portolio</h1>
                <div className="flex items-center gap-10">
                    <Popover>
                        <PopoverTrigger>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <h2 className="p-4 border-b-[1px] border-[#eee] font-bold">ゆーた</h2>
                            <ul className="p-4 space-y-4">
                                <li>プロフィール設定</li>
                                <li>ログアウト</li>
                            </ul>
                        </PopoverContent>
                    </Popover>
                    <Button>
                        投稿する
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header