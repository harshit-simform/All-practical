const id = this.sessionStorage.getItem("viewProductId");
onload = function () {
  if (id) {
    const data = JSON.parse(localStorage.getItem(id));
    document.getElementById("viewForm").reset();
    document.getElementById("id").value = id;
    document.getElementById("productName").value = data.productName;
    document.getElementById("productImage").value = data.productImage;
    document.getElementById("productPrice").value = data.productPrice;
    document.getElementById("productDescription").value =
      data.productDescription;
  } else {
    this.document.body.innerHTML = "<h1>404 Error</h1>";
  }
};
function backFunc(e) {
  e.preventDefault();
  window.location.replace("../index.html");
  sessionStorage.clear();
}
