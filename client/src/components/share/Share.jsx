import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext"
import axios from "axios";

export default function Share() {
  
const http = axios.create({
  baseURL: "http://127.0.0.1:3000/api",
  withCredentials: true
})


  const {user} = useContext(AuthContext)
  const desc = useRef()
  const [file,setFile] = useState(null)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    }
    
    try{
     await http.post("/posts/",newPost)
    } catch(err){}
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
         <img className="shareProfileImg" src={user.profilePicture ? "../../../public/assets/" + user.profilePicture : "../../../public/assets/person/profilepicture.jpg"} alt="" />
          <input placeholder={`What's in your mind ${user.username}?`} className="shareInput" ref={desc} />
        </div>

        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMediaIcon htmlColor="tomato" className="shareIcon"/>
              <span className="shareOptionText">Photo or Video</span>
              <input style={{display: "none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.file[0])}/>
            </label>
            <div className="shareOption">
              <LabelIcon htmlColor="blue" className="shareIcon"/>
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <RoomIcon htmlColor="green" className="shareIcon"/>
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor="gold" className="shareIcon"/>
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">Share</button>
        </form>
        
      </div>
    </div>
  )
}
