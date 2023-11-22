import "./topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link} from 'react-router-dom';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Topbar() {
  const http = axios.create({
    baseURL: "http://127.0.0.1:3000/api",
    withCredentials: true
  })
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { user } = useContext(AuthContext);

    const handleSearch = async () => {
      try {
        const response = await http.get(`/users?username=${searchTerm}`);
        const userData = response.data;
  
        // Verifica si se encontró algún usuario
        if (userData) {
          // Redirige al perfil del usuario encontrado
          navigate(`/profile/${userData.username}`);
        } else {
          // Maneja el caso en el que no se encuentra el usuario
          console.log("Usuario no encontrado");
        }
  
        // Actualiza los resultados de búsqueda si es necesario
        setSearchResults(userData);
      } catch (error) {
        console.error("Error searching users:", error);
      }
    };
    
    return (
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/" style= {{ textDecoration: "none" }}>
            <span className="logo">Facehack</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <SearchIcon className="searchIcon" onClick={handleSearch}></SearchIcon>
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <PersonIcon />
              <span className="topbarIconBadge">0</span>
            </div>
            <div className="topbarIconItem">
              <ChatIcon />
              <span className="topbarIconBadge">0</span>
            </div>
            <div className="topbarIconItem">
              <NotificationsIcon />
              <span className="topbarIconBadge">0</span>
            </div>
          </div>
          <span className="topbarUsername">{user.username}</span>
          <Link to={`/profile/${user.username}`}>
            <img src={user.profilePicture ? "../../../public/assets/" + user.profilePicture : "../../../public/assets/" + "person/profilepicture.jpg"} alt="" className="topbarImg"/>
          </Link>
        </div>
      </div>
    );
  }