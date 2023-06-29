/*eslint-disable */

const registerForm = document.getElementById('register-form');

// function for register from client side
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
    alert(
      `errorCode: ${error.response.status}\nmessage: ${error.response.data.message}`
    );
  }
});
