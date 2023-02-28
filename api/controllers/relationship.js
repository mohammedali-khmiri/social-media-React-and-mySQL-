import { db } from "../connectionDB.js";
import jwt from "jsonwebtoken";

//GET ALL FOLLOWERS USERS ID OF FOLLOWED USER
export const getRelationships = (req, res) => {
  const q = `SELECT followerUserId FROM relationships WHERE followedUserId = ?`;

  db.query(q, [req.query.followedUserId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json(data.map((following) => following.followerUserId));
  });
};
//FOLLOW
export const addRelationship = (req, res) => {
  /* Getting the token from the cookie. */
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "You are not logged in" });

  /* Verifying the token. */
  jwt.verify(token, "secret key", (err, userInfo) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });

    const q =
      "INSERT INTO relationships (`followerUserId`,`followedUserId`) VALUES (?)";
    const values = [userInfo.id, req.body.followedUserId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Follow added successfully!");
    });
  });
};

//UNFOLLOW

export const deleteRelationship = (req, res) => {
  /* Getting the token from the cookie. */
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json({ message: "You are not logged in" });

  /* Verifying the token. */
  jwt.verify(token, "secret key", (err, userInfo) => {
    if (err) return res.status(403).json({ message: "Token is not valid" });

    const q =
      "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

    db.query(q, [userInfo.id, req.query.userId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Follow deleted successfully!");
    });
  });
};
