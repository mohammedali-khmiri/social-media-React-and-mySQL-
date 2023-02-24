import "./comments.scss";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import moment from "moment";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  // get all comments of the current post
  // Queries
  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      console.log(res.data);

      return res.data;
    })
  );

  // Access the client
  const queryClient = useQueryClient();
  //mutations after adding a new comment it's gonna refresh our fetch method get comments
  // Mutations
  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments/new", newComment);
    },
    {
      onSuccess: () => {
        //Invalidate and refresh
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment.."
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
        ? "Loading"
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.fullName}</span>
                <p>{comment.desc}</p>
                <div className="interaction">
                  <span>Like</span>
                  <span>respond</span>
                </div>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
