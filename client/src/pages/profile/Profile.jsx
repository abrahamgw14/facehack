import "./profile.css"
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import { useEffect, useState } from "react"
import { getUser } from "../../services/api-services"

export default function Profile() {
  const [user, setUser] = useState({})

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
  },[])

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
                  src="/assets/post/3.jpeg"
                  alt=""
                />
                <img
                  className="profileUserImg"
                  src="/assets/person/7.jpeg"
                  alt=""
                />
              </div>
              <div className="profileInfo">
                  <h4 className="profileInfoName">{user.username}</h4>
                  <span className="profileInfoDesc">{user.desc}</span>
              </div>
            </div>
            <div className="profileRightBottom">
              <Feed username="manuel"/>
              <Rightbar profile/>
            </div>
          </div>
        </div>
      </>
    );
  }