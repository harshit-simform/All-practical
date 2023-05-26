/*eslint-disable */
import axios from 'axios';

const registerForm = document.getElementById('register-form');
console.log(registerForm);

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  let dataObj = {};

  const formField = document.querySelectorAll('.data-field');

  formField.forEach((field) => {
    dataObj[field.name] = field.value;
  });
  console.log(dataObj);

  //   const result = await fetch('http://localhost:8000/api/register', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(dataObj),
  //   });
  //   if (result.ok) {
  //     alert('Registration successful');
  //     location.assign('/welcome');
  //   }
  const result = await axios({
    method: 'POST',
    url: 'http://localhost:8000/api/register',
    data: dataObj,
  });
  console.log(result);
});
