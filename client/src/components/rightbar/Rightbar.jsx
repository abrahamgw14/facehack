import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "../online/Online"

export default function Rightbar({profile}) {

  const HomeRightbar = () => {
    return(
      <>
      <div className="birthdayContainer">
          <img src="/assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText"><b>Antonio Garcia</b> and <b>3 other friends</b> have a birthday today</span>
        </div>
          <a target="_blank" rel="noreferrer" href="https://github.com/abrahamgw14">
            <img src="/assets/github.jpg" alt="" className="rightbarGit"/>
          </a>
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(u=>(
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  }

  const Profilerightbar = () => {
    return( 
      <>
      <h4 className="rightbarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoVal">New York</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoVal">Madrid</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoVal">Single</span>
        </div>
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        <div className="rightbarFollowing">
          <img src="/assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Antonio Garcia</span>
        </div>
        <div className="rightbarFollowing">
          <img src="/assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Antonio Garcia</span>
        </div>
        <div className="rightbarFollowing">
          <img src="/assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Antonio Garcia</span>
        </div>
        <div className="rightbarFollowing">
          <img src="/assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Antonio Garcia</span>
        </div>
        <div className="rightbarFollowing">
          <img src="/assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Antonio Garcia</span>
        </div>
        <div className="rightbarFollowing">
          <img src="/assets/person/1.jpeg" alt="" className="rightbarFollowingImg" />
          <span className="rightbarFollowingName">Antonio Garcia</span>
        </div>
      </div>
      </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <Profilerightbar/> : <HomeRightbar/>}
      </div>
    </div>
  )
}
