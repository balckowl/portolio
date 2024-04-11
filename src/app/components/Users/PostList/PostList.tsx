import Link from "next/link"

const getAllPosts = async (userId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${userId}`)

    const data = await res.json()

    return data
}

type PostType = {
    post_id: number,
    title: string,
    description: string,
    icon: string,
}

const PostList = async ({ userId }: { userId: string }) => {

    // const { id } = params
    const PostsData = await getAllPosts(userId)


    const renderEmoji = (emoji: string) => {
        if (emoji) {
            const codePoints = emoji.split('-').map(cp => parseInt(cp, 16));
            return String.fromCodePoint(...codePoints);
        }
        return '';
    };

    return (
        <div className="py-[90px] lg:py-[140px]">
            <div className="container flex justify-center">
                <div className="w-full lg:w-[80%]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {PostsData.length != 0 && PostsData.map((post: PostType) => (
                            <div className="col-span-1 border-[1px] border-[#eee] rounded-[5px] bg-[#eee]" key={post.post_id}>
                                <Link href={`/posts/${post.post_id}`}>
                                    <div className="text-center py-5">
                                        {post.icon && (
                                            <span className="text-[50px]">{renderEmoji(post.icon)}</span>
                                        )}
                                    </div>
                                    <div className="bg-white py-5 text-center">
                                        <h2 className="text-[20px] font-bold">{post.title}</h2>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    {PostsData.length == 0 && <p className="text-[16px] text-center">まだ投稿一つもされていません。</p>}
                </div>
            </div>
        </div>
    )
}

export default PostList