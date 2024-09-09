


async function btnclicked() {
  console.log("data added");
  console.log(document.getElementById('title').value);
  console.log(document.getElementById('body').value);
    const response = await fetch('http://notes-api-dev.us-east-1.elasticbeanstalk.com/note', {
   
      referrerPolicy: "unsafe-url",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: document.getElementById('title').value,
        data : document.getElementById('body').value
      })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}  