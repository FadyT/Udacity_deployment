import fetch  from "node-fetch";

import express from "express";

const app = express()

  app.get('/', (req, res) => {
    res.send('hello world')
  })

  app.get('/getnotes', async (req, res) => {
    const response = await fetch('https://reqres.in/api/users');
    const data = await response.json();
    console.log(data);
    res.send(data)
  })

  app.get('/addnotes', async (req, res) => {
    const data = req.query;
    console.log(data);
    res.send(data)
  })
    
const note = {
  "title": "title 1",
  "data": "data"
}


async function addUser(data) {
    const response = await fetch('https://reqres.in/api/users', {
            method: 'post',
            body: JSON.stringify(data),
    });

    const resData = await response.json();
    console.log(resData);
}

//addUser(note)

function convertDataToList(data) {
  var result = "<ol></ol>";
  data.forEach(function (item) {
    result += "<li>" + item.email + " " + item.first_name;
  });

}


app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})