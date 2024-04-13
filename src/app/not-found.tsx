"use client"

import Image from "next/image"

const NotFound = () => {
    return (
        <div className="conntainer mx-auto py-[100px] min-h-[calc(100vh-80px-60px)]">
            <Image src="/images/users/face5.png" width={50} height={50} alt="zasetsuface" className="mx-auto"/>
            <h2 className="text-[30px] lg:text-[50px] text-center">404 Not<span className="text-orange-400">f</span>ound</h2>
            <p className="text-[10px] lg:text-[20px] text-center">ページ移動に挫折しました</p>
        </div>
    )
}

export default NotFound