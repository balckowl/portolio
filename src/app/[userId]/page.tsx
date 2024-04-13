import Hero from "../components/Users/Hero/Hero"
import Header from "../components/Users/Header/Header"
import PostList from "../components/Users/PostList/PostList"
import Footer from "../components/Users/Footer/Footer"

const page = ({ params }: { params: { userId: string } }) => {

  const { userId } = params

  return (
    <div>
      <Header />
      <Hero userId={userId}/>
      <PostList userId={userId}/>
      <Footer/>
    </div>
  )
}

export default page