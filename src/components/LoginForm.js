import React, {useState} from "react"
import FirebaseAuthService from "../FirebaseAuthService";

const LoginForm = ({existingUser}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await FirebaseAuthService.loginUser(username, password)
      setUsername("")
      setPassword("")
    } catch (error) {
      alert(error.message)
    }
  }

  const handleLogout = async () => {
    await FirebaseAuthService.logoutUser()
  }

  const handleInputUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleInputPassword = (e) => {
    setPassword(e.target.value)
  }

  const handleResetPassword = async () => {
    if (!username) {
      alert("Missing username!")
      return
    }

    try {
      await FirebaseAuthService.sendPasswordResetEmail(username)
      alert("Sent the password reset email")
    } catch (error) {
      alert(error.message)
    }
  }

  const handleLoginWithGoogle = async () => {
    try {
      await FirebaseAuthService.loginWithGoogle()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="login-form-container">
      {existingUser ? <div className="row">
        <h3>Welcome, {existingUser.email}</h3>
        <button type="button" className="primary-button" onClick={handleLogout}>
          Logout
        </button>
      </div> : <form onSubmit={handleSubmit} className="login-form">
        <label className="input-label login-label">
          Username (email):
          <input type="email" required value={username} onChange={handleInputUsername} className="input-text"/>
        </label>
        <label className="input-label login-label">
          Password:
          <input type="password" required value={password} onChange={handleInputPassword} className="input-text"/>
        </label>
        <div className="button-box">
          <button className="primary-button">Login</button>
          <button type="button" className="primary-button" onClick={handleResetPassword}>Reset password</button>
          <button type="button" className="primary-button" onClick={handleLoginWithGoogle}>Login with Google</button>
        </div>
      </form>}
    </div>
  )
}

export default LoginForm
