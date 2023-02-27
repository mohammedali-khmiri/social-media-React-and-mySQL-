import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import EditIcon from "@mui/icons-material/Edit";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import Posts from "../../components/posts/Posts";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(location.pathname.split("/")[2]);

  // Queries
  //get all Information of specific user by sending userId
  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  //get followerUserId of specific user by sending his userId
  const { isLoading: rIsLoading, data: rData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );

  //add follow or delete it after that refresh get followerUserId method 👆
  // Access the client
  const queryClient = useQueryClient();
  // Mutations
  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      else
        return makeRequest.post("/relationships", { followedUserId: userId });
    },
    {
      onSuccess: () => {
        //Invalidate and refresh
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = (e) => {
    e.preventDefault();
    mutation.mutate(rData.includes(currentUser.id));
  };

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={data.coverPic} alt="" className="cover" />
            <img src={data.profilePic} alt="" className="profilePic" />
            <div className="changePic">
              <i class="bi bi-camera-fill"></i>
            </div>
          </div>
          <div className="profileContainer">
            <div className="userInfo">
              <div className="info">
                <span className="name">{data.fullName}</span>
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
                  {rIsLoading ? (
                    "Loading"
                  ) : userId === currentUser.id ? (
                    <button>
                      <EditIcon /> update
                    </button>
                  ) : (
                    <button onClick={handleFollow}>
                      <PersonAddOutlinedIcon />{" "}
                      {rData.includes(currentUser.id) ? "following" : "follow"}
                    </button>
                  )}
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
            <Posts userId={userId} />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
