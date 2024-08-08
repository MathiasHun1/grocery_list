import { Link } from "react-router-dom"
import StdButton from "./StdButton"

const Navbar = () => {
  return (
    <div>
      <Link to='/login'>
            <StdButton text="Login"/>
      </Link>

      <Link to='/sign-up'>
        <StdButton text="Sign up"/> 
      </Link>
    </div>
  )
}

export default Navbar