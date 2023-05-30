const express = require("express");
const path = require("path");
const multer = require("multer");
const File = require("./fileModel");
const sharp = require("sharp");

const app = express();

const upload = multer({
  storage: multer.memoryStorage(),
});

app.set("view engine", "ejs"); // for setting view engine

app.use(express.static(path.join(__dirname, "public"))); // for serving static files

// api route for displaying default upload page
app.get("/", (req, res) => {
  res.status(200).render("uploadFile");
});

// api route for getting all uploaded files from database and showing them in browser
app.get("/files", async (req, res) => {
  const files = await File.find();
  if (!files) throw new Error(`File not found`);
  res.status(200).render("files", {
    files,
  });
});

// api route for backend for uploading/resizing and save image in database and in local
app.post("/fileUpload", upload.single("photo"), async (req, res) => {
  try {
    req.file.filename = `file-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`public/img/${req.file.filename}`);
    const data = await File.create({
      name: req.file.originalname,
      image: req.file.filename,
    });
    res.status(200).json({ data });
  } catch (err) {
    console.log("error", err.message);
  }
});

module.exports = app;
