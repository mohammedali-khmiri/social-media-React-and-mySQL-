import jwt from "jsonwebtoken";
import { db } from "../connectionDB.js";

export const getTimeline = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "You are not logged in" });

  jwt.verify(token, "secret key", (err, userInfo) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });

    const q = `SELECT p.*, u.id AS userId, fullName, profilePic FROM posts AS p JOIN users AS u ON( p.userId = u.id) 
LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) 
WHERE r.followerUserId = ? OR p.userId = ?`;

    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
