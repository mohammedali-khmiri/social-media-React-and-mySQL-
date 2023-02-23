import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import Event from "../../assets/event.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
const Share = () => {
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const upload = async () => {
    try {
      //create form Data because we cannot send the file directly to the API because
      const formData = new FormData();
      formData.append("file", file);

      const res = await makeRequest.post("/upload", formData);

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);

  //mutations after adding a new post it's gonna refresh our fetch method get posts
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts/new", newPost);
    },
    {
      onSuccess: () => {
        //Invalidate and refresh
        queryClient.invalidateQueries("posts");
      },
    }
  );

  //assign res of upload function to the imgUrl and send to the mutation
  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={currentUser.profilePic} alt="" />
            <textarea
              rows={1}
              type="text"
              placeholder={`What's on your mind ${currentUser.fullName}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
            <div className="item">
              <img src={Event} alt="" />
              <span>Event</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
