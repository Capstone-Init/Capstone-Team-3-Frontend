import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineHome, AiOutlineClose } from "react-icons/ai";
import {
  MdWorkOutline,
  MdOutlineDarkMode,
  MdOutlineLightMode,
} from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { BiInfoCircle, BiCopyright } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import logo from "../../Assets/LOGO.png";
import "./Nav.css";

export default function Nav() {
  const [openNav, setOpenNav] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  function navbarClick() {
    setOpenNav(!openNav);
  }

  return (
    <nav>
      {!openNav ? (
        <RxHamburgerMenu
          size={"35px"}
          style={{ marginTop: "24px" }}
          color={"#41CDBC"}
          onClick={() => navbarClick()}
        />
      ) : (
        <AiOutlineClose
          size={"35px"}
          style={{ marginTop: "24px" }}
          color={"#41CDBC"}
          onClick={() => navbarClick()}
        />
      )}

      <img src={logo} alt="logo" />

      <Link to="/">
        <VscAccount className="nav-sign" size={"30px"} />
        <br />
        Sign-in
      </Link>

      {/* sliding nav bar section */}
      <aside
        className={openNav ? " slide-nav nav-open" : " slide-nav nav-close"}
      >
        <p>
          {/* <span>inIT</span> */}
          <br />
          <br />
          <span className="slogan">"Your first tech opportunity awaits!"</span>
        </p>
        <Link to="/" onClick={() => navbarClick()}>
          <AiOutlineHome size={"30px"} color={"#41cdbc"} />
          <span>Home</span>
        </Link>
        <Link to="/jobs" onClick={() => navbarClick()}>
          <MdWorkOutline size={"30px"} color={"#41cdbc"} />
          <span>Jobs</span>
        </Link>
        <Link to="/about" onClick={() => navbarClick()}>
          <BiInfoCircle size={"30px"} color={"#41cdbc"} />
          <span>Meet the Devs</span>
        </Link>
        <hr></hr>
        {/* was class => to className */}
        <label className="switch">
          <input type="checkbox" onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
        <button className="logoutBtn">Logout</button>
        {/* maybe have footer info here ??  */}
        {/* <div className="footer-info">
        <span> inIT <BiCopyright /></span>
        <span>Team 3 Capstone</span>
        <span>May 2023</span>
        <span>
          <a href = "https://www.pursuit.org/" target = "_blank" className="pursuit">Pursuit.org</a> 
        </span>
      </div> */}
      </aside>
    </nav>
  );
}
