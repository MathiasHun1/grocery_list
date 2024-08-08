import { Link } from "react-router-dom"
import StdButton from "./StdButton"

const Navbar = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Link to='/login'>
            <StdButton text="Login"/>
      </Link>
      <p className="text-white">or</p>
      <Link to='/sign-up'>
        <StdButton text="Sign up"/> 
      </Link>
    </div>
  )
}

export default Navbar