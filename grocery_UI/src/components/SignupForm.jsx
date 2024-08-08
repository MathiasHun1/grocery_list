import InputField from "./InputField"
import StdButton from "./StdButton"
import { Link } from "react-router-dom"


const SignupForm = ({ signup, name, username, password, confirmPass, handleNameChange, handleUsernameChange, handlePassChange, handleConfirmPassChange, clearFields }) => {
  return (
    <form 
      onSubmit={signup} 
      className="px-8 py-4 w-fit flex flex-col gap-2 shadow-lg bg-black text-white">

      <InputField type="text" text="Full Name" placeholder="Kovács Jakab" onChange={handleNameChange} value={name}/>

      <InputField type="text" text="Username" placeholder="repabela21" onChange={handleUsernameChange} value={username}/>

      <InputField type="password" text="Password" placeholder="password123" onChange={handlePassChange} value={password}/>

      <InputField type="password" text="Confirm Password" placeholder="password123" onChange={handleConfirmPassChange} value={confirmPass}/>

      <div className="flex flex-col items-center gap-2">
        <StdButton type="submit" text="Register" className="p-2 w-32"/>
        <Link to='/'>
          <StdButton type="button" text="Cancel" className="p-2 w-32" onClick={clearFields}/>
        </Link>
      </div>
    </form>
  )
}

export default SignupForm