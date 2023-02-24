import jwt from "jsonwebtoken";
import moment from "moment";
import { db } from "../connectionDB.js";

//GET ALL COMMENTS
export const getComments = (req, res) => {
  const q = `SELECT c.*, u.id AS userId, fullName, profilePic FROM comments AS c JOIN users AS u ON( c.userId = u.id)
WHERE c.postId = ? ORDER BY c.createdAt DESC`;

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

//ADD  A COMMENT
export const addComment = (req, res) => {
  /* Getting the token from the cookie. */
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "You are not logged in" });

  /* Verifying the token. */
  jwt.verify(token, "secret key", (err, userInfo) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });

    const q =
      "INSERT INTO comments (`desc`,`userId`,`postId`, `createdAt`) VALUES (?)";
    const values = [
      req.body.desc,
      userInfo.id,
      req.body.postId,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment added successfully!");
    });
  });
};
