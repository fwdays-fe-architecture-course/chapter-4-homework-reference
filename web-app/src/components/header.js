import { Link } from "gatsby";
import React from "react";
import { FaHome, FaReadme } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { CiServer } from "react-icons/ci";
import { PiStarBold } from "react-icons/pi";

const Header = () => {
  return (
    <nav>
      <div className="home-link-container">
        <Link to="/">
          <FaHome></FaHome>
          Home
        </Link>
      </div>
      <div className="nav-link-container">
        <Link to="/cv/">
          <MdWork></MdWork>
          CV
        </Link>
        <Link to="/ssr/">
          <CiServer />
          SSR
        </Link>
        <Link to="/star-wars/">
          <PiStarBold></PiStarBold>
          Star Wars
        </Link>
        <Link to="/blog/">
          <FaReadme></FaReadme>
          Blog
        </Link>
      </div>
    </nav>
  );
};

export default Header;
