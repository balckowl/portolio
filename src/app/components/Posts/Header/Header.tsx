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
import Picker from '@emoji-mart/react';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import Link from "next/link";
import data from "@emoji-mart/data"
import Image from "next/image";

const Header = ({ title, content }: { title: string, content: string }) => {

    const [emoji, setEmoji] = useState({ unified: "1F603" , src: ""}); // デフォルトの絵文字を"😃"のUnicodeコードポイントに変更
    const { data: session, status } = useSession();

    const router = useRouter();

    const handleSubmit = async () => {

        if (title && content && emoji) {
            const loading = toast.loading("送信中...");

            let icon;

            if(emoji.unified){
                icon = emoji.unified
            }else{
                icon = emoji.src
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/${session?.user?.uid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: title, description: content, icon: icon }), // iconフィールドを絵文字コードで動的に更新
            });

            const data = await res.json();

            console.log(data);

            toast.dismiss(loading);
            toast.success("送信できました。");
            router.push(`/${session?.user?.uid}`);
            router.refresh();
        } else {
            toast.error("必要な情報が足りません。");
        }
    };

    // 絵文字をUnicode文字列として正しく表示する
    const renderEmoji = () => {
        if (emoji.unified) {
            const codePoints = emoji.unified.split('-').map(cp => parseInt(cp, 16));
            return String.fromCodePoint(...codePoints);
        }else{
            return <Image src={`${emoji.src}`} width={40} height={40} alt={""}/>
        }
    }

    const custom = [
        {
            id: 'zasetulevel',
            name: 'zasetu level',
            emojis: [
                {
                    id: 'zasetulevel1',
                    name: '全然大丈夫',
                    keywords: ['zasetulevel1'],
                    skins: [{ src: '/images/users/face1.png' }],
                },
                {
                    id: 'zasetulevel2',
                    name: 'ちょっと挫折してる',
                    keywords: ['zasetulevel2'],
                    skins: [{ src: '/images/users/face2.png' }],
                },
                {
                    id: 'zasetulevel3',
                    name: 'そこそこ挫折してる',
                    keywords: ['zasetulevel3'],
                    skins: [{ src: '/images/users/face3.png' }],
                },
                {
                    id: 'zasetulevel4',
                    name: 'クッソ挫折している',
                    keywords: ['zasetulevel4'],
                    skins: [{ src: '/images/users/face4.png' }],
                },
                {
                    id: 'zasetulevel5',
                    name: '挫折して立ち直れない',
                    keywords: ['zasetulevel5'],
                    skins: [{ src: '/images/users/face5.png' }],
                },
            ],
        },
    ]

    return (
        <div className="h-[80px] bg-white">
            <Toaster />
            <div className="container flex justify-between h-full items-center">
                <h1 className="text-4xl font-bold">
                    <Link href="/">
                        <Image src={"/images/logo/logo.png"} width={160} height={50} alt={"logo"}/>
                    </Link>
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
                                <Picker onEmojiSelect={(emoji: any) => { setEmoji(emoji); console.log(emoji) }} data={data} custom={custom} />
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
