const uploadForm = document.getElementById("file-upload-form");

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = new FormData();
  form.append("photo", document.querySelector(".data-field").files[0]);
  await axios
    .post("http://localhost:8000/fileUpload", form)
    .then((response) => {
      if (response.status === 200) {
        alert("Uploaded file successfully");
        location.reload(true);
        location.assign("/files");
      }
    })
    .catch((error) => console.error(error));
});
