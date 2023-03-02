import jwt from "jsonwebtoken";
import { db } from "../connectionDB.js";

export const getUser = (req, res) => {
  /* A query to get user info  */
  const userId = req.params.userId;
  const q = `SELECT * FROM users WHERE id = ?`;

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.status(200).json(info);
  });
};

export const updateUser = (req, res) => {
  /* Getting the token from the cookie. */
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "You are not logged in" });

  /* Verifying the token. */
  jwt.verify(token, "secret key", (err, userInfo) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });

    /* A query to update user info  */
    const q =
      "UPDATE users SET `fullName`=?,`coverPic`=?,`profilePic`=? WHERE id=? ";

    db.query(
      q,
      [req.body.fullName, req.body.coverPic, req.body.profilePic, userInfo.id],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};
