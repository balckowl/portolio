import { Button } from "@/components/ui/button"

const Header = () => {
    return (
        <div className="h-[80px]">
            <div className="container flex justify-between h-full items-center">
                <h1 className="text-4xl font-bold">Portolio</h1>
                <Button>はじめる</Button>
            </div>
        </div>
    )
}

export default Header