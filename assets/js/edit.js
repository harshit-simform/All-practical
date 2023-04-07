const id = this.sessionStorage.getItem("productId"); /// getting product id
onload = function () {
  if (id) {
    const data = JSON.parse(localStorage.getItem(id));
    document.getElementById("editForm").reset();
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
///// function for updating the product
function editProduct(e) {
  if (confirm("Are you sure you want to edit this product")) {
    e.preventDefault();
    localStorage.removeItem(id);
    const formData = {};
    const productData = document.querySelectorAll(".infoFields");
    productData.forEach((element) => {
      formData[element.lastElementChild.id] = element.lastElementChild.value;
    });
    localStorage.setItem(id, JSON.stringify(formData));
    window.location.href = "/index.html";
    sessionStorage.clear();
  } else {
    return;
  }
}
/// function for going back to the main page
const cancelEdit = (e) => {
  e.preventDefault();
  window.location.replace("../index.html");
  sessionStorage.clear();
};
