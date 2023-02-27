import "./posts.scss";
import Post from "../post/Post";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";

const Posts = ({ userId }) => {
  // Queries
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      console.log(res.data);

      return res.data;
    })
  );

  return (
    <div className="posts">
      {error
        ? "Something went wrong"
        : isLoading
        ? "Is Loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
