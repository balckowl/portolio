import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Link } from "lucide-react"

const Header = () => {
    return (
        <div className="h-[80px]">
            <div className="container flex justify-between h-full items-center">
                <h1 className="text-4xl font-bold">Portolio</h1>
                <div className="flex items-center gap-10">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Button>
                        投稿する
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header