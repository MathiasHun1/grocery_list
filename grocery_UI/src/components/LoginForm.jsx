import InputField from "./InputField"
import StdButton from "./StdButton"
import { Link } from "react-router-dom"

const LoginForm = ({user, login, username, handleUsernameChange, password, handlePassChange, clearFields}) => {

  return (
    <>
      {!user && (
        <form 
        onSubmit={login} 
        className="px-8 py-4 bg-emerald-600 w-fit h-fit flex flex-col gap-2">

          <InputField type="text" text="User" placeholder="repabela21" onChange={handleUsernameChange} value={username}/>

          <InputField type="password" text="Password" placeholder="password123" onChange={handlePassChange} value={password}/>

          <div className="flex flex-col items-center gap-2">
            <StdButton type="submit" text="Login" className="p-2 w-32"/>
            <Link to='/'>
              <StdButton type="button" text="Cancel" className="p-2 w-32" onClick={clearFields}/>
            </Link>
          </div>
        </form>

      )}
    </>
  )
}

export default LoginForm