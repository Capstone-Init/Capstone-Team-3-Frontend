import { useState} from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../Assets/LOGO.png";
import "./Nav.css";


export default function Nav() {
  const [openNav, setOpenNav] = useState(false)
  
  function navbarClick () {
    setOpenNav(!openNav)
  }


  return (
    <nav>
      
      <RxHamburgerMenu 
      size={"50px"} 
      color={"#41CDBC"}
      onClick = {() => navbarClick()} />

      <img src={logo} alt="logo" height="90%" />

      <Link to="/">Sign-in</Link>

      {/* sliding nav bar section */}
        <aside className={ openNav ? " slide-nav nav-open" : " slide-nav nav-close"}>
        <p>
          <span>inIT</span>
          <br/>
          <span className="slogan">"Your first tech opportunity awaits..."</span>
        </p>
        <Link to = "/" onClick = {() => navbarClick()} >Home</Link>
        <Link to = "/jobs" onClick = {() => navbarClick()}>Jobs</Link>
        <Link to = "/about" onClick = {() => navbarClick()}>About</Link>
        <button>LOGOUT</button>
        {/* maybe have footer info here ??  */}
        <div className="footer-info">
          <span>inIT</span>
            <span>Team 3 Capstone</span>
            <span>May 2023</span>
            <span>
              <a href = "https://www.pursuit.org/" target = "_blank" className="pursuit">Pursuit.org</a> 
            </span>
        </div>
      </aside>
      
    </nav>
  );
}