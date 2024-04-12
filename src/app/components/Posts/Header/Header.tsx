import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Header = ({ title, content }: { title: string, content: string }) => {

    const [emoji, setEmoji] = useState("1F603"); // デフォルトの絵文字を"😃"のUnicodeコードポイントに変更
    const { data: session, status } = useSession();

    const router = useRouter();

    const handleSubmit = async () => {

        if (title && content && emoji) {
            const loading = toast.loading("送信中...");

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/${session?.user?.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: title, description: content, icon: emoji }), // iconフィールドを絵文字コードで動的に更新
            });

            const data = await res.json();

            console.log(data);

            toast.dismiss(loading);
            toast.success("送信できました。");
            router.push(`/${session?.user?.id}`);
            router.refresh();
        } else {
            toast.error("必要な情報が足りません。");
        }
    };

    // 絵文字をUnicode文字列として正しく表示する
    const renderEmoji = () => {
        if (emoji) {
            const codePoints = emoji.split('-').map(cp => parseInt(cp, 16));
            return String.fromCodePoint(...codePoints);
        }
        return '';
    };

    return (
        <div className="h-[80px] bg-white">
            <Toaster />
            <div className="container flex justify-between h-full items-center">
                <h1 className="text-4xl font-bold">
                    <Link href="/">Portolio</Link>
                </h1>
                <Dialog>
                    <DialogTrigger className="bg-black text-white px-[14px] py-[10px] rounded-[5px] text-[15px]">
                        投稿する
                    </DialogTrigger>
                    <DialogContent>
                        <h2 className="mb-[10px] text-[20px] font-bold">記事を投稿しよう</h2>
                        <p className="text-[14px]">アイコンを選んで、その作品の失敗度を相手に伝えよう。</p>
                        <Popover>
                            <PopoverTrigger className="w-full h-[70px]">
                                <div className="flex w-full h-full border-[1px] border-[#eee] rounded-[5px]">
                                    <div className="w-[20%] h-full text-[40px] bg-[#eee] rounded-tl-[5px] rounded-bl-[5px] flex items-center justify-center">
                                        {renderEmoji()} {/* 絵文字を正しく表示 */}
                                    </div>
                                    <div className="w-[80%] h-full flex items-center justify-center">失敗度をアイコンで表そう</div>
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Picker data={data} onEmojiSelect={(emoji: any) => { setEmoji(emoji.unified); console.log(emoji) }} />
                            </PopoverContent>
                            <Button onClick={handleSubmit}>投稿する</Button>
                        </Popover>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default Header;
