"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import Link from "next/link"

const Start = () => {

    const { data: session, status } = useSession()

    return (
        <div className="pt-[140px] pb-[140px]">
            <div className="container flex justify-center">
                <div className="w-full lg:w-[80%]">
                    <h3 className="text-center text-[30px] lg:text-[39px] font-[700]">さあ、はじめよう</h3>
                    <motion.div animate={{ y: [-10, 0, -10], opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="flex justify-center mb-[50px]">
                        <div className="w-8 h-8 border-4 border-transparent rotate-[45deg] before:content-[''] before:block before:w-8 before:h-8 before:border-4 before:border-t-transparent before:border-l-transparent before:border-r-[#565656] before:border-b-[#565656]"></div>
                    </motion.div>
                    <div className="text-center">
                        {!session ? (
                            <Button>
                                <Link href="/users/sign-in">
                                    はじめる
                                </Link>
                            </Button>
                        ) : (
                            <Button>
                                <Link href={`/${session?.user.uid}`}>
                                    My Portolioへ
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Start