import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import Posts from "../../components/posts/Posts";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/14969869/pexels-photo-14969869.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="cover"
        />
        <img
          src="https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          className="profilePic"
        />
        <div className="changePic">
          <img
            src="https://cdn.icon-icons.com/icons2/37/PNG/512/slr_camera_application_slr_3037.png"
            alt=""
          />
        </div>
      </div>
      <div className="profileContainer">
        <div className="userInfo">
          <div className="info">
            <span className="name">{currentUser.fullName}</span>
            <span className="friends">1 K friends . 7 in common</span>
            <div className="contactInfo">
              <a href="http://facebook.com">
                <FacebookTwoToneIcon
                  className="icon"
                  fontSize="large"
                  style={{ color: "#385898" }}
                />
              </a>
              <a href="http://instagram.com">
                <InstagramIcon
                  className="icon"
                  fontSize="large"
                  style={{ color: "#c1558b" }}
                />
              </a>
              <a href="http://twitter.com">
                <TwitterIcon
                  className="icon"
                  fontSize="large"
                  style={{ color: "#009eff" }}
                />
              </a>
              <a href="http://linkedin.com">
                <LinkedInIcon
                  className="icon"
                  fontSize="large"
                  style={{ color: "#0077b5" }}
                />
              </a>
              <a href="http://pinterest.com">
                <PinterestIcon
                  className="icon"
                  fontSize="large"
                  style={{ color: "#ad081b" }}
                />
              </a>
            </div>
          </div>
          <div className="action">
            <div className="item">
              <button>
                <PersonAddOutlinedIcon /> follow
              </button>
            </div>
            <div className="item">
              <button>
                <EmailOutlinedIcon /> Message
              </button>
            </div>
            <div className="item">
              <MoreVertIcon className="threeDot" />
            </div>
          </div>
        </div>
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
