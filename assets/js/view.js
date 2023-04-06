const id = this.sessionStorage.getItem("viewProductId");
onload = function () {
  const data = JSON.parse(localStorage.getItem(id));
  document.getElementById("viewForm").reset();
  document.getElementById("id").value = id;
  document.getElementById("productName").value = data.productName;
  document.getElementById("productImage").value = data.productImage;
  document.getElementById("productPrice").value = data.productPrice;
  document.getElementById("productDescription").value = data.productDescription;
};
