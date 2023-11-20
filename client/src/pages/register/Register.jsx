import { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef()
  const email = useRef();
  const password = useRef()
  const passwordAgain = useRef()
  const history = useNavigate()


  const http = axios.create({
    baseURL: "http://127.0.0.1:3000/api",
    withCredentials: true
})

  function getTimeline() {
    return http.post("/auth/register")
}

  const handleClick = async (e) => {
    e.preventDefault()
    if(passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords doesn't match")
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try{
        await getTimeline() + user
        history.push("/login")
      } catch(err){
        console.log(err)
      }
      
    }
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facehack</h3>
          <span className="loginDesc">
            <b>Sign Up</b>, it’s quick and easy.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Email" required ref={email} type="email" className="loginInput" />
            <input placeholder="Password" required ref={password} type="password" minLength="8" className="loginInput" />
            <input placeholder="Password Again" required ref={passwordAgain} type="password" minLength="8" className="loginInput" />
            <button className="loginButton" type="submit">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}