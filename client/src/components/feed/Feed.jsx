import { useContext, useEffect, useState } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from "axios"
import { AuthContext } from "../../context/authContext"

export default function Feed({username}) {
  const [posts , setPosts] = useState(null);
  const {user} = useContext(AuthContext)

  const http = axios.create({
    baseURL: "http://127.0.0.1:3000/api",
    withCredentials: true
})

function getTimeline() {
    return http.get("/posts/timeline/" + user._id)
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
  },[username,user._id]) // Asi no esta renderizando constantemente

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