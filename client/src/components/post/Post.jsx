import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Comments from "../comments/Comments";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { Menu, MenuItem } from "@mui/material";

const Post = ({ post }) => {
  //MENU SECTION
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //COMMENT SECTION
  const [commentOpen, setCommentOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // Queries
  //get all comments of specific post by sending postId
  const {
    isLoading: isLoadingComment,
    error: errComment,
    data: dataComment,
  } = useQuery(["comments", post.id], () =>
    makeRequest.get("/comments?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  //LIKES SECTION

  //get all likes of specific post by sending postId
  const { isLoading, error, data } = useQuery(["likes", post.id], () =>
    makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  );

  // Access the client
  const queryClient = useQueryClient();
  //mutations after sending request and the config it's gonna refresh our fetch likes query
  // Mutations
  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      else return makeRequest.post("/likes", { postId: post.id });
    },
    {
      onSuccess: () => {
        //Invalidate and refresh
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleLike = async (e) => {
    e.preventDefault();
    // IMPORTANT 🟡:the variable inside mutate well sends to useMutation
    mutation.mutate(data.includes(currentUser.id));
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    mutation.mutate(data.includes(currentUser.id));
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="user-info">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="author">{post.fullName}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon className="treeDot" onClick={handleClick} />
          <Menu
            className="basic-menu"
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem className="basic-menu" onClick={handleClose}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          {post.img && <img src={"/upload/" + post.img} alt="" />}
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "Loading"
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon onClick={handleLike} />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {dataComment?.length} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
