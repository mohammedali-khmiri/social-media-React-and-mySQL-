import jwt from "jsonwebtoken";
import moment from "moment";
import { db } from "../connectionDB.js";

//GET ALL POSTS
export const getTimeline = (req, res) => {
  /* Getting the token from the cookie. */
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "You are not logged in" });

  /* Verifying the token. */
  jwt.verify(token, "secret key", (err, userInfo) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });

    const userId = req.query.userId;

    /* A query to get the posts of the user and the posts of the users that the user is following. */
    const q =
      userId !== "undefined"
        ? `SELECT p.*, u.id AS userId, fullName, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC`
        : `SELECT p.*, u.id AS userId, fullName, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId)
    LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId= ? OR p.userId =?
    ORDER BY p.createdAt DESC`;

    const values =
      userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

//ADD  A POST

export const addPost = (req, res) => {
  /* Getting the token from the cookie. */
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "You are not logged in" });

  /* Verifying the token. */
  jwt.verify(token, "secret key", (err, userInfo) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });

    const q =
      "INSERT INTO posts (`desc`, `img`, `userId`, `createdAt`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post added successfully!");
    });
  });
};
//DELETE A POST

export const deletePost = (req, res) => {
  /* Getting the token from the cookie. */
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "You are not logged in" });

  /* Verifying the token. */
  jwt.verify(token, "secret key", (err, userInfo) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });

    const q = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";

    db.query(q, [req.params.postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      // affectedRow if its bigger than 0 mean user is updated
      if (data.affectedRow > 0)
        res.status(200).json("Post deleted successfully!");
      return res.status(403).json("Can't delete this post");
    });
  });
};
