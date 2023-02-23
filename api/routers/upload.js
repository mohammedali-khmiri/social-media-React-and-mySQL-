import express from "express";
import multer from "multer";
const router = express.Router();

router.post("/", (req, res) => {
  const storage = multer.diskStorage({
    // destination is used to determine within which folder the uploaded files should be stored.
    destination: function (req, file, cb) {
      cb(null, "/client/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });

  const upload = multer({ storage: storage });
  upload.single("file");
});

export default router;
