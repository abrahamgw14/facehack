import "./profile.css"
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

export default function Profile() {
  const [user, setUser] = useState({})
  const username = useParams().username

  const http = axios.create({
    baseURL: "http://127.0.0.1:3000/api",
    withCredentials: true
})

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await http.get(`/users?username=${username}`)
        setUser(res.data)
      } catch(err){
        console.error(err)
      }
    }
   fetchUser()
  },[username])

  
    return (
      <>
        <Topbar />
        <div className="profile">
          <Sidebar />
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img
                  className="profileCoverImg"
                  src={user.coverPicture ? "../../../public/assets/" + user.coverPicture : "../../../public/assets/nocover.jpg"}
                  alt=""
                />
                <img
                  className="profileUserImg"
                  src={user.profilePicture ? "../../../public/assets/" + user.profilePicture : "../../../public/assets/person/profilepicture.jpg"}
                  alt=""
                />
              </div>
              <div className="profileInfo">
                  <h4 className="profileInfoName">{user.username}</h4>
                  <span className="profileInfoDesc">{user.desc}</span>
              </div>
            </div>
            <div className="profileRightBottom">
              <Feed username={username}/>
              <Rightbar user={user}/>
            </div>
          </div>
        </div>
      </>
    );
  }