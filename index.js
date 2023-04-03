const urlParams = new URLSearchParams(location.search);
for (const [key, value] of urlParams) {
  if (key == course) {
    const appendData = document.createTextNode(` ${value}`);
    document.getElementById(`${key}`).appendChild(appendData);
  } else {
    document.getElementById(`${key}`).innerHTML = value;
  }
  var course = key;
}
