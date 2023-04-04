window.onload = getAllProduct();

const uniqueId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2);

function submitForm(e) {
  e.preventDefault();
  const formData = {};
  const productData = document.querySelectorAll(".infoFields");
  productData.forEach((element) => {
    formData[element.lastElementChild.id] = element.lastElementChild.value;
  });
  const id = uniqueId();
  localStorage.setItem(id, JSON.stringify(formData));
  getAllProduct();
  document.getElementById("createForm").reset();
}

function getAllProduct() {
  document.getElementsByTagName("tbody")[0].innerHTML = "";
  const productArray = { ...localStorage };
  Object.entries(productArray).forEach((element) => {
    const id = element[0];
    const data = JSON.parse(element[1]);
    const insertData = `
    <td>${id}</td>
    <td>${data.productName}</td>
    <td>${data.productImage}</td>
    <td>${data.productPrice}</td>
    <td>${data.productDescription}</td>
    <td><i class="fa-solid fa-eye" onclick="viewProduct(event)"></i>
    <i class="fa-solid fa-pen-to-square" onclick="editProduct(event)"></i>
    <i class="fa-solid fa-trash" onclick="deleteProduct(event)"></i></td>`;
    const newElement = document.createElement("tr");
    newElement.innerHTML = insertData;
    document.getElementsByTagName("tbody")[0].appendChild(newElement);
  });
}
function deleteProduct(e) {
  console.log(e.target.parentElement.parentElement.firstElementChild.innerText);
}
