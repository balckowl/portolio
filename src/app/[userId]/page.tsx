import Hero from "../components/Users/Hero/Hero"
import Header from "../components/Users/Header/Header"
import PostList from "../components/Users/PostList/PostList"

const page = ({ params }: { params: { userId: string } }) => {

  const { userId } = params

  return (
    <div>
      <Header />
      <Hero userId={userId}/>
      <PostList userId={userId}/>
    </div>
  )
}

export default page