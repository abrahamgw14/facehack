import { useContext, useRef } from "react";
import "./login.css"
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/authContext";

export default function Login() {
    const email = useRef();
    const password = useRef()
    const {user, isFetching, error, dispatch} = useContext(AuthContext)


    const handleClick = (e) => {
        e.preventDefault()
        loginCall({email:email.current.value,password: password.current.value}, dispatch)
    }
    console.log(user)
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Facehack</h3>
                <span className="loginDesc">Connect with friends and the world around you on Facehack</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Email" type="email" required className="loginInput" ref={email} />
                    <input placeholder="Password" type="password" required minLength="8" className="loginInput" ref={password} />
                    <button className="loginButton" disabled={isFetching}>{isFetching ? "Loading.." : "Log In" }</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <hr className="loginHr" />
                    <button className="loginRegisterButton">{isFetching ? "Loading.." : "Create a New Account" }</button>
                </form>
            </div>
        </div>
    </div>
  )
}