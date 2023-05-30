const express = require("express");
const path = require("path");
const multer = require("multer");
const File = require("./fileModel");
const sharp = require("sharp");

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.status(200).render("uploadFile");
});

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

app.get("/files", async (req, res) => {
  const files = await File.find();
  if (!files) throw new Error(`File not found`);
  res.status(200).render("files", {
    files,
  });
});

module.exports = app;
