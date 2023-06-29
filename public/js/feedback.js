/*eslint-disable */

const feedbackForm = document.getElementById('feedback-form');

// function for register from client side
feedbackForm.addEventListener('submit', async (e) => {
  try {
    e.preventDefault();

    let dataObj = {};

    const formField = document.querySelectorAll('.data-field');

    formField.forEach((field) => {
      dataObj[field.name] = field.value;
    });
    console.log(dataObj);
    const result = await axios({
      method: 'POST',
      url: 'http://localhost:8000/api/feedback',
      data: dataObj,
    });

    alert('Feedback Posted successfully');
    location.assign('/user_feedback');
  } catch (error) {
    alert(
      `errorCode: ${error.response.status}\nmessage: ${error.response.data.message}`
    );
  }
});
