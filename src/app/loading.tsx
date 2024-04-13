const Loading = () => {
    return (
        <div className="flex text-center items-center min-h-[calc(100vh-80px-60px)] bg-white">
                <div className="m-auto w-[350px]">
                    <div className="mx-auto w-[280px]">
                         <img src="/images/loading/ローディング.gif" className="w-[250px] mx-auto"/> 
                    </div>
                    <div className="pb-5 text-[20px] mt-[25px] text-gray-700 justify-center">
                        <div className="relative h-[100px]">

                        <div className="absolute bottom-[40px] left-[-15px]">
                                <div className="flex justify-center relative w-[250px] mx-auto h-[45px] left-[70px]">
                                    <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-0">挫</div>
                                    <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-8">折</div>
                                    <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-16">し</div>
                                    <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-24">て</div>
                                    <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-32">い</div>
                                    <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-40">ま</div>
                                    <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute bottom-0 left-48">す</div>
                                </div>
                            </div>
                            <div className="absolute bottom-[72px] left-[90px]">
                                <div className="flex justify-center relative w-[190px] mx-auto h-[45px]">
                                    <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute left-0 bottom-0">読</div>
                                    <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute left-8 bottom-0">み</div>
                                    <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute left-16 bottom-0">込</div>
                                    <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute left-24 bottom-0">み</div>
                                    <div className="bg-gray-400 text-white w-[45px] h-[45px] rounded-[20px] flex items-center justify-center absolute left-32 bottom-0">に</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Loading