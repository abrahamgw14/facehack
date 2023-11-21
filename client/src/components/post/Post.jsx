import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useContext, useEffect, useState } from "react";
import {format} from "timeago.js"
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";

export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})
    const {user:currentUser} = useContext(AuthContext)


    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))    // Si le damos like a un post que ya tenga nuestro like desde la database le da dislike y se lo quita del contador
    },[currentUser._id, post.likes])

    const http = axios.create({
        baseURL: "http://127.0.0.1:3000/api",
        withCredentials: true
    })

    function getUser() {
        return http.get(`/users?userId=${post.userId}`)
    }

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await getUser()
            setUser(res.data)
          } catch(err){
            console.error(err)
          }
        }
       fetchUser()
      },[post.userId]) // Renderiza de nuevo el userId cuando cambiamos de userId

    const likeHandler = () => {
        try{
         http.put("/posts/"+ post._id + "/like", { userId: currentUser._id })
        }catch(err){}
        setLike(isLiked ? like - 1 : like+1)
        setIsLiked(!isLiked)    
    }
    return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`/profile/${user.username}`}>
                        <img className="postProfileImg" src={user.profilePicture ? "../../../public/assets/" + user.profilePicture : "../../../public/assets/person/profilepicture.jpg"} alt="" />
                    </Link>
                    <span className="postUsername">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight"> 
                    <MoreVertIcon/> 
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img className="postImg"src={`../../../public/assets/post/${post.img}`} alt="" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="" />
                    <img className="likeIcon" src="/assets/like.png" onClick={likeHandler} alt="" />
                    <span className="postLikeCounter">{like} people liked it </span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
