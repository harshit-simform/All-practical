/*eslint-disable */

const logoutForm = document.getElementById('logout-form');

logoutForm.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();
    const result = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/logout',
    });
    console.log(result);
    alert('logout successful!');
    location.reload(true);
    location.assign('/');
  } catch (error) {
    console.error(error);
    alert(
      `errorCode: ${error.response.status} \n message: ${error.response.data.message}`
    );
  }
});
