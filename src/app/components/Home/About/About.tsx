import Image from "next/image"

const About = () => {
    return (
        <div className="pt-[140px] pb-[140px]">
            <div className="container flex justify-center">
                <div className="w-[80%]">
                    <h3 className="text-center text-[39px] font-[700] mb-[30px]">誰にだって失敗はあるはず...</h3>
                    <p className="w-[70%] mx-auto mb-[40px] text-[14px] tracking-[0.25rem] leading-8">
                        ポートフォリオには、成功作品だけが含まれるわけではありません。確かに成功は素晴らしいですが、失敗にも魅力がたくさん隠されています。
                        私たちは、成功ではなく、誰もが経験する失敗に焦点を当て、それを皆で共有できるプラットフォームを作りました。
                    </p>
                    <div>
                        <Image src="/images/about/about.png" width={800} height={200} alt="about" className="mx-auto"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About