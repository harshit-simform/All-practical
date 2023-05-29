/*eslint-disable */

const logoutForm = document.getElementById('logout-form');

// function for logout from client side
logoutForm.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();
    const result = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/logout',
    });
    alert('logout successful!');
    location.reload(true);
    location.assign('/');
  } catch (error) {
    alert(
      `errorCode: ${error.response.status} \n message: ${error.response.data.message}`
    );
  }
});
