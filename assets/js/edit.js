const id = this.sessionStorage.getItem("productId");
onload = function () {
  const data = JSON.parse(localStorage.getItem(id));
  document.getElementById("editForm").reset();
  document.getElementById("id").value = id;
  document.getElementById("productName").value = data.productName;
  document.getElementById("productImage").value = data.productImage;
  document.getElementById("productPrice").value = data.productPrice;
  document.getElementById("productDescription").value = data.productDescription;
};

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
  } else {
    return;
  }
}
