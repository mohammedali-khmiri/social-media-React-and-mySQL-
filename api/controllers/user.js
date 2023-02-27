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
