import { useEffect, useState } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from "axios"

export default function Feed() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("posts/timeline/654d3576a987e3628e02a1dc")
      console.log(res)
    }
   fetchPosts()
  },[]) // Asi no esta renderizando constantemente

  return (
    <div className="feed">
        <div className="feedWrapper">
            <Share/>
            {/*{Posts.map((p)=> (
              <Post key={p.id}post={p}/>
            ))}*/}
        </div>
    </div>
  )
}
