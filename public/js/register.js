/*eslint-disable */
// import axios from 'axios';

const registerForm = document.getElementById('register-form');
console.log(registerForm);

registerForm.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();

    let dataObj = {};

    const formField = document.querySelectorAll('.data-field');

    formField.forEach((field) => {
      dataObj[field.name] = field.value;
    });

    const result = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/register',
      data: dataObj,
    });

    alert('Register successful! Please Login...');
    location.assign('/');
  } catch (error) {
    console.log(error);
    alert(
      `errorCode: ${error.response.status} \n message: ${error.response.data.message}`
    );
  }
});
