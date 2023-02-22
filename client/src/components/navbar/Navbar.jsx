import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const { darkMode, toggle } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Social.</span>
        </Link>
        <HomeOutlinedIcon style={{ cursor: "pointer" }} />

        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} style={{ cursor: "pointer" }} />
        ) : (
          <DarkModeOutlinedIcon
            onClick={toggle}
            style={{ cursor: "pointer" }}
          />
        )}

        <AppsOutlinedIcon style={{ cursor: "pointer" }} />
        <div className="search">
          <SearchOutlinedIcon
            style={{ cursor: "pointer" }}
            onClick={() => setSearchOpen(!searchOpen)}
          />
          {searchOpen ? (
            <input
              style={{ display: "block" }}
              type="text"
              placeholder="Search for friend, post or video..."
            />
          ) : (
            <input
              type="text"
              placeholder="Search for friend, post or video..."
            />
          )}
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon style={{ cursor: "pointer" }} />
        <EmailOutlinedIcon style={{ cursor: "pointer" }} />
        <NotificationsNoneOutlinedIcon style={{ cursor: "pointer" }} />
        <Link to={`/profile`} className="link-profile">
          <div className="user">
            <img src={currentUser.profilePic} alt="" />
            <span>{currentUser.fullName}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
