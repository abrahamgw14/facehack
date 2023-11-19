import { useEffect, useState } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from "axios"
import { getTimeline, getUserProfile } from "../../services/api-services"

export default function Feed({username}) {
  const [posts , setPosts] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username 
        ? await getUserProfile() // Si hay profile ("/posts/profile/"+username) (muestra los posts del user profile)
        : await getTimeline() // Si no muestra la timeline
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
