import "./Header.css";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaSignInAlt } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { FcStumbleupon } from "react-icons/fc";
import { userLoginContext } from "../../contexts/userLoginContext";
import { useContext } from "react";

function Header() {
  let { logoutUser, userLoginStatus } = useContext(userLoginContext);

  return (
    <div className="d-flex flex-wrap justify-content-around header">
      <h1>
        {" "}
        <FcStumbleupon className="fs-1" />
        MyShop
      </h1>
      <ul className="nav fs-5 p-3">
        <li className="nav-item">
          <Link to="" className="nav-link text-white">
            <HiOutlineHome className="fs-3 text-warning " /> Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="register" className="nav-link text-white">
            <SiGnuprivacyguard className="fs-3 text-warning " />
            Register
          </Link>
        </li>
        {userLoginStatus === false ? (
          <li className="nav-item">
            <Link to="login" className="nav-link text-white">
              <FaSignInAlt className="fs-3 text-warning me-2 " />
              Login
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="login" className="nav-link text-white" onClick={logoutUser}>
              <FaSignInAlt className="fs-3 text-warning me-2 " />
              Logout
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link to="about" className="nav-link text-white">
            <IoMdInformationCircle className="fs-3 text-warning me-2 " />{" "}
            Aboutus
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
