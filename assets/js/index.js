const displayArea = document.getElementById("displayProduct");
const searchValue = document.getElementById("searchProduct");
const displayIdArea = document.getElementById("filterById");

//// flags for filtering by asc/desc
const flags = {
  sortPriceDescending: true,
  sortNameDescending: true,
  sortIdDescending: true,
};
/// function for displaying the id which is selected
displayIdArea.addEventListener("change", (e) => {
  if (displayIdArea.value === "all") {
    displayProduct(Object.entries(localStorage));
  } else {
    const filteredIds = Object.entries(localStorage).filter(
      (element) => element[0] === displayIdArea.value
    );
    displayProduct(filteredIds);
  }
});

/// function for displaying the All the products Id in main page
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

//// function for displaying all the products
const displayProduct = (arr) => {
  document.getElementsByTagName("tbody")[0].innerHTML = "";
  if (arr.length === 0) {
    document.getElementsByTagName("tbody")[0].innerHTML =
      "<h2> No Product Found </h2>";
  }
  arr.forEach((element) => {
    const id = element[0];
    const data = JSON.parse(element[1]);
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
// the onload function which calls the getallproducts and display Id function
window.onload = function () {
  if (localStorage.length === 0) {
    displayArea.style.display = "none";
  } else {
    displayArea.style.display = "block";
    getAllProduct();
    displayId();
  }
};

/// function for generating unique ID's
const uniqueId = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2);

//// Below functions are used for searching for products through input fields using debouncing technique
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
  const productArray = { ...localStorage };
  const searchedProduct = Object.entries(productArray).filter((product) => {
    return JSON.parse(product[1])
      .productName.toLowerCase()
      .includes(query.toLowerCase())
      ? product
      : null;
  });
  displayProduct(searchedProduct);
};
const debouncingOperation = debounce(searchProduct, 300);
searchValue.addEventListener("keyup", (e) => {
  debouncingOperation(searchValue.value);
});

/// function submitting and setting data into local storage
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

/// funtion for getting all the products
function getAllProduct() {
  const productArray = Object.entries(localStorage);
  displayProduct(productArray);
}

/// function for deleting the selected product
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

// function for routing to the edit page for the product
function editProduct(e) {
  const id = e.target.closest("tr").firstElementChild.innerHTML;
  sessionStorage.setItem("productId", id);
  window.location.href = `/pages/edit.html`;
}

// function for routing to the view page for the product
function viewProduct(e) {
  const id = e.target.closest("tr").firstElementChild.innerHTML;
  sessionStorage.setItem("viewProductId", id);
  window.location.href = `/pages/view.html`;
}

/// function for sorting products through their price
const sortByPrice = () => {
  const productArray = Object.entries(localStorage);
  productArray.sort(
    (a, b) => JSON.parse(a[1]).productPrice - JSON.parse(b[1]).productPrice
  );
  document.getElementById("arrow-price").style.transform = "rotateX(0deg)";
  if (flags.sortPriceDescending) {
    productArray.reverse();
    document.getElementById("arrow-price").style.transform = "rotateX(180deg)";
  }
  displayProduct(productArray);
  flags.sortPriceDescending = !flags.sortPriceDescending;
};

/// function for sorting products through their name
const sortByName = () => {
  const productArray = Object.entries(localStorage);
  productArray.sort((a, b) =>
    JSON.parse(a[1]).productName.localeCompare(JSON.parse(b[1]).productName)
  );
  document.getElementById("arrow-name").style.transform = "rotateX(0deg)";
  if (flags.sortNameDescending) {
    productArray.reverse();
    document.getElementById("arrow-name").style.transform = "rotateX(180deg)";
  }
  displayProduct(productArray);
  flags.sortNameDescending = !flags.sortNameDescending;
};

/// function for sorting products through their Id
const sortById = () => {
  const productArray = Object.entries(localStorage);
  productArray.sort((a, b) =>
    a[0].localeCompare(b[0], undefined, { numeric: true, sensitivity: "base" })
  );
  document.getElementById("arrow-id").style.transform = "rotateX(0deg)";
  if (flags.sortIdDescending) {
    productArray.reverse();
    document.getElementById("arrow-id").style.transform = "rotateX(180deg)";
  }
  displayProduct(productArray);
  flags.sortIdDescending = !flags.sortIdDescending;
};
