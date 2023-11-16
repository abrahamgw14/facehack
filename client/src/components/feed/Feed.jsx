import { useEffect, useState } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from "axios"
import { getTimeline } from "../../services/api-services"

export default function Feed() {
  const [posts , setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getTimeline()
        setPosts(res.data)
      } catch(err){
        console.error(err)
      }
    }
   fetchPosts()
  },[]) // Asi no esta renderizando constantemente

  return (
    <div className="feed">
        <div className="feedWrapper">
            <Share/>
            {posts ? posts.map((p)=> (
              <p key={p.id}>{p.desc}</p>
            )) : <>Loading...</>}
        </div>
    </div>
  )
}
