import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "../online/Online"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Rightbar({ user }) {

  const http = axios.create({
    baseURL: "http://127.0.0.1:3000/api",
    withCredentials: true
})

const [friends, setFriends] = useState([]);
const {user:currentUser, dispatch} = useContext(AuthContext)
const [followed,setFollowed] = useState(currentUser.followings.includes(user?.id))

useEffect(() => {
  setFollowed(currentUser.followings.includes(user?.id))
}, [currentUser, user?.id]);

useEffect(() => {
  const getFriends = async () => {
    try {
      if (user && user._id) {
        const friendList = await http.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  getFriends();
}, [user]);

  const handleClick = async () => {
    try {
      if(followed) {
        await http.put("/users/"+user._id+"/unfollow", {userId: currentUser._id})
        dispatch({ type: "UNFOLLOW", payload: user._id })
      }else{
        await http.put("/users/"+user._id+"/follow", {userId: currentUser._id})
        dispatch({ type: "FOLLOW", payload: user._id })
      }
    } catch(err) {
      console.log(err)
    }
    setFollowed(!followed)
  }


  const HomeRightbar = () => {
    return(
      <>
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
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <RemoveIcon/> : <AddIcon/>}
        </button>
      )}
      <h4 className="rightbarTitle">User Information</h4>
      <div className="rightbarInfo">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">City:</span>
          <span className="rightbarInfoVal">{user.city}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">From:</span>
          <span className="rightbarInfoVal">{user.from}</span>
        </div>
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Relationship:</span>
          <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>        </div>
      </div>
      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFollowings">
        {Array.isArray(friends) &&
          friends.map((friend) => (
            <Link key={friend.id} to={"/profile/" + friend.username} style={{textDecoration:"none"}}>
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? "../../../public/assets/" + friend.profilePicture
                      : "../../../public/assets/person/profilepicture.jpg"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <Profilerightbar/> : <HomeRightbar/>}
      </div>
    </div>
  )
}
