
# front end hosted on S3
# we have one website to add notes to database 
url http://notesbucket1234.s3.amazonaws.com/addNote.html
# and another website to load data and display it in list 
http://notesbucket1234.s3.amazonaws.com/index.html

# backend hosted on EB
# the end point used for get request
http://notes-api-dev.us-east-1.elasticbeanstalk.com/note
# end point used for post request
http://notes-api-dev.us-east-1.elasticbeanstalk.com/note
# data should be added in the body in json format like this 
{
        "title": "title 3",
        "data": "some note data"
}

## Infrastructure description
for this project i used 
- postgres for database and hosted it on aws RDS
- for the backend i created nodejs api using express , added cors to the endpoints
- the backend nodejs app is hosted on aws Elastic beanstalk 
- the front end consist of 2 html pages one for adding new note (addNote.html) and the other for getting list of notes (index.html)

### Dependencies

- Node v14.15.1 (LTS) or more recent. While older versions can work it is advisable to keep node to latest LTS version

- npm 6.14.8 (LTS) or more recent, Yarn can work but was not tested for this project

- AWS CLI v2

- EB CLI

- A RDS database running Postgres.

- A S3 bucket for hosting frontend.

# Backend dependencies :

- "cors": "^2.8.5",
- "dotenv": "^16.4.5",
- "express": "^4.19.2",
- "pg": "^8.12.0"




## Pipeline process
the circle ci run pipeline by running build jop then deploy
# build job
first install the dependencies for frontend and backend by running npm install command 
  "frontend:install": "cd notes-frontend && npm install ",

# deploy job
it runs : "deploy": "npm run api:install && npm run frontend:install &&  npm run frontend:deploy"

which run : "api:deploy": "cd notes-api && npm run deploy"
and : "frontend:deploy": "cd notes-frontend && npm run deploy",


api:deploy runs : "deploy": "eb init --region us-east-1 --platform Node.js notes-api && eb use notes-api-dev && eb deploy"

while frontend:deploy runs : "deploy" : "aws s3 cp --recursive --acl public-read ./build s3://notesbucket1234/" 

## Built With

- [Node](https://nodejs.org) - Javascript Runtime
- [Express](https://expressjs.com/) - Javascript API Framework


# project diagram
https://drive.google.com/file/d/15Z6PoSzje9wJ1JcZ5qbaIP_BYxCbkuB8/view?usp=sharing