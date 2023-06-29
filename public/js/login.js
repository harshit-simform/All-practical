/*eslint-disable */

const loginForm = document.getElementById('login-form');

// function for login from client side
loginForm.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();

    let dataObj = {};

    const formField = document.querySelectorAll('.data-field');

    formField.forEach((field) => {
      dataObj[field.name] = field.value;
    });

    const result = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/login',
      data: dataObj,
    });
    alert('Login successful!');
    location.assign('/welcome');
  } catch (error) {
    console.error(error);
    alert(
      ` errorCode: ${error.response.status}\n message: ${error.response.data.message}`
    );
  }
});
