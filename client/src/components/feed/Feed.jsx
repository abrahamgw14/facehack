import { useEffect, useState } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from "axios"

export default function Feed({username}) {
  const [posts , setPosts] = useState(null);

  const http = axios.create({
    baseURL: "http://127.0.0.1:3000/api",
    withCredentials: true
})

function getTimeline() {
    return http.get("/posts/timeline/6550ef155339b525ba6daa20")
}

function getUserProfilePost() {
  return http.get("/posts/profile/" + username)
}

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username 
        ? await getUserProfilePost() 
        : await getTimeline()
        setPosts(res.data)
      } catch(err){
        console.error(err)
      }
    }
   fetchPosts()
  },[username]) // Asi no esta renderizando constantemente

  return (
    <div className="feed">
        <div className="feedWrapper">
            <Share/>
            {posts ? posts.map((p)=> (
              <Post key={p._id} post={p} />
            )) : <>Loading...</>}
        </div>
    </div>
  )
}