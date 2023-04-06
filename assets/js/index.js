const displayArea = document.getElementById("displayProduct");
const searchValue = document.getElementById("searchProduct");
const displayIdArea = document.getElementById("filterById");
const optionsArea = document.getElementsByTagName("option");
console.log(optionsArea);
for (let option of optionsArea) {
  console.log(option);
  // option.addEventListener("click", (e) => {
  //   console.log(e.target.innerHTML);
  // });
}
const flags = {
  sortPriceDescending: false,
  sortNameDescending: false,
  sortIdDescending: false,
};
displayIdArea.addEventListener("change", (e) => {
  console.log(displayIdArea.value);
  if (displayIdArea.value === "all") {
    displayProduct(Object.entries(localStorage));
  } else {
    const filteredIds = Object.entries(localStorage).filter(
      (element) => element[0] === displayIdArea.value
    );
    displayProduct(filteredIds);
  }
});
const displayId = () => {
  displayIdArea.innerHTML = "";
  const createElement = document.createElement("option");
  createElement.value = "all";
  createElement.innerHTML = "All";
  displayIdArea.appendChild(createElement);
  Object.entries(localStorage).map((element) => {
    const createElement = document.createElement("option");
    createElement.value = element[0];
    createElement.innerHTML = element[0];
    displayIdArea.appendChild(createElement);
  });
};
const displayProduct = (arr) => {
  document.getElementsByTagName("tbody")[0].innerHTML = "";
  if (arr.length === 0) {
    document.getElementsByTagName("tbody")[0].innerHTML =
      "<h2> No Product Found </h2>";
  }
  arr.forEach((element) => {
    const id = element[0];
    const data = JSON.parse(element[1]);
    console.log(data);
    const insertData = `
    <td>${id}</td>
    <td>${data.productName}</td>
    <td><img src="${data.productImage}" alt="product-image"></td>
    <td>${data.productPrice}</td>
    <td>${data.productDescription}</td>
    <td><i class="fa-solid fa-eye" onclick="viewProduct(event)"></i>
    <i class="fa-solid fa-pen-to-square" onclick="editProduct(event)"></i>
    <i class="fa-solid fa-trash" onclick="deleteProduct(event)"></i></td>`;
    const newElement = document.createElement("tr");
    newElement.innerHTML = insertData;
    document.getElementsByTagName("tbody")[0].appendChild(newElement);
  });
};
window.onload = function () {
  if (localStorage.length === 0) {
    displayArea.style.display = "none";
  } else {
    displayArea.style.display = "block";
    getAllProduct();
    displayId();
  }
};

const uniqueId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2);

const debounce = (func, delay) => {
  let timer;
  return (...arguments) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
};
const searchProduct = (query) => {
  // console.log(query);
  const productArray = { ...localStorage };
  const searchedProduct = Object.entries(productArray).filter((product) => {
    console.log(query.toLowerCase());
    return JSON.parse(product[1])
      .productName.toLowerCase()
      .includes(query.toLowerCase())
      ? product
      : null;
  });
  displayProduct(searchedProduct);
  console.log(searchedProduct);
};
const debouncingOperation = debounce(searchProduct, 300);

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
  displayId();
  document.getElementById("createForm").reset();
  displayArea.style.display = "block";
}

function getAllProduct() {
  const productArray = Object.entries(localStorage);
  displayProduct(productArray);
}
function deleteProduct(e) {
  if (confirm("Are you sure you want to delete")) {
    const id = e.target.closest("tr").firstElementChild.innerHTML;
    localStorage.removeItem(id);
    getAllProduct();
    displayId();
    localStorage.length === 0
      ? (displayArea.style.display = "none")
      : (displayArea.style.display = "block");
  } else {
    return;
  }
}

function editProduct(e) {
  const id = e.target.closest("tr").firstElementChild.innerHTML;
  sessionStorage.setItem("productId", id);
  window.location.href = `/pages/edit.html`;
}

function viewProduct(e) {
  const id = e.target.closest("tr").firstElementChild.innerHTML;
  sessionStorage.setItem("viewProductId", id);
  window.location.href = `/pages/view.html`;
}

searchValue.addEventListener("keyup", (e) => {
  debouncingOperation(searchValue.value);
});
const sortByPrice = () => {
  const productArray = Object.entries(localStorage);
  productArray.sort(
    (a, b) => JSON.parse(a[1]).productPrice - JSON.parse(b[1]).productPrice
  );
  if (flags.sortPriceDescending) productArray.reverse();
  displayProduct(productArray);
  flags.sortPriceDescending = !flags.sortPriceDescending;
};

const sortByName = () => {
  const productArray = Object.entries(localStorage);
  productArray.sort((a, b) =>
    JSON.parse(a[1]).productName.localeCompare(JSON.parse(b[1]).productName)
  );
  if (flags.sortNameDescending) productArray.reverse();
  displayProduct(productArray);
  flags.sortNameDescending = !flags.sortNameDescending;
};

const sortById = () => {
  const productArray = Object.entries(localStorage);
  productArray.sort((a, b) =>
    a[0].localeCompare(b[0], undefined, { numeric: true, sensitivity: "base" })
  );
  if (flags.sortIdDescending) productArray.reverse();
  displayProduct(productArray);
  flags.sortIdDescending = !flags.sortIdDescending;
};
