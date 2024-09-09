   
fetch('http://notes-api-dev.us-east-1.elasticbeanstalk.com/note' , 
  {referrerPolicy: "unsafe-url",
  })
    .then(response => response.json())
    .then(characters => showCharacters(characters));

   showCharacters = characters => {
    console.log(characters);
    const charactersDiv = document.querySelector('#notes');
    characters.forEach(character => {
      const characterElement = document.createElement(`p`);
      characterElement.innerText = `Title : ${character.title} \n Data : ${character.data}`;
      charactersDiv.append(characterElement);
    });
  }

