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


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username 
        ? await http.get("/posts/profile/" + username) 
        : await http.get("/posts/timeline/" + user._id)
        setPosts(res.data.sort((p1,p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt) // Nos compara las fechas de creacion entre posts para poner primero los mas recientes
        }))
      } catch(err){
        console.error(err)
      }
    }
   fetchPosts()
  },[username, user._id]) // Asi no esta renderizando constantemente

  return (
    <div className="feed">
        <div className="feedWrapper">
            {(!username || username === user.username) && <Share/>}
            {posts ? posts.map((p)=> (
              <Post key={p._id} post={p} />
            )) : <>Loading...</>}
        </div>
    </div>
  )
}