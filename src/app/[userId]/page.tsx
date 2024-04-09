import Hero from "../components/Users/Hero/Hero"
import Header from "../components/Users/Header/Header"
import PostList from "../components/Users/PostList/PostList"

const page = () => {
  return (
    <div>
        <Header />
        <Hero />
        <PostList />
    </div>
  )
}

export default page