import { db } from "../connectionDB.js";
import jwt from "jsonwebtoken";

//GET LIKES
export const getLikes = (req, res) => {
  const q = `SELECT userId FROM likes WHERE postId = ?`;

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((like) => like.userId));
  });
};
//ADD LIKE
export const addLike = (req, res) => {
  /* Getting the token from the cookie. */
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "You are not logged in" });

  /* Verifying the token. */
  jwt.verify(token, "secret key", (err, userInfo) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });

    const q = "INSERT INTO likes (`userId`,`postId`) VALUES (?)";
    const values = [userInfo.id, req.body.postId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Like added successfully!");
    });
  });
};

//DELETE LIKE

export const deleteLike = (req, res) => {
  /* Getting the token from the cookie. */
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "You are not logged in" });

  /* Verifying the token. */
  jwt.verify(token, "secret key", (err, userInfo) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });

    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

    db.query(q, [userInfo.id, req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Like deleted successfully!");
    });
  });
};
