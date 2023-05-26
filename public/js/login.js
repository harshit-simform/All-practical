/*eslint-disable */

const loginForm = document.getElementById('login-form');
console.log(loginForm);

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  let dataObj = {};

  const formField = document.querySelectorAll('.data-field');

  formField.forEach((field) => {
    dataObj[field.name] = field.value;
  });

  const result = await fetch('http://localhost:8000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataObj),
  });
  if (result.ok) {
    alert('Login successful');
    location.assign('/welcome');
  }
});
