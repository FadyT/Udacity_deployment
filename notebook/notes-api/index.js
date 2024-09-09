const express = require('express')
const { Pool } = require('pg');
require('dotenv').config()

const app = express()
const port = 8080

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host:process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT // Change this if your PostgreSQL server is running on a different port
});
  
  app.use(express.json());

  async function createnoteTable() {
    /*
  console.log("////////////" + process.env.POSTGRES_USER)
  console.log("////////////" + process.env.POSTGRES_HOST)
  console.log("////////////" + process.env.POSTGRES_DATABASE)
  console.log("////////////" + process.env.POSTGRES_PASSWORD)
  console.log("////////////" + process.env.POSTGRES_PORT)
*/
    try {
      const query = `CREATE TABLE IF NOT EXISTS note (id SERIAL PRIMARY KEY,title VARCHAR(255) NOT NULL,data VARCHAR(255) NOT NULL);`;
      await pool.query(query);
      console.log('Albums table created');
    } catch (err) {
      console.error(err);
      console.error('Albums table creation failed');
    }
  }
  
  createnoteTable();


app.get('/', (req, res) => {
  res.send('Hello!')
})

app.post('/note', async (req, res) => {
    // Validate the incoming JSON data
    const { title, data } = req.body;
    console.log(req.body);
    if (!title || !data ) {
      return res.status(400).send('please type title and data.');
    }
  
    try {
      // try to send data to the database
      const query = `INSERT INTO note (title, data) VALUES ($1, $2) RETURNING id;`;
      const values = [title, data];
      const result = await pool.query(query, values);
      res.status(201).send({ message: 'New note added', id: result.rows[0].id });
    } catch (err) {
      console.error(err);
      res.status(500).send('some error has occured');
    }
  });

  app.get('/note', async (req, res) => {
    try {
      const query = 'SELECT * FROM note;';
      const { rows } = await pool.query(query);
      res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('failed');
    }
  });

  app.get('/note/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'SELECT * FROM note WHERE id = $1;';
      const { rows } = await pool.query(query, [id]);
  
      if (rows.length === 0) {
        return res.status(404).send('this album is not in the database');
      }
  
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('failed');
    }
  });
  app.put('/note/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, data } = req.body;
  
      if (!title && !data) {
        return res.status(400).send('provide a field (title or data)');
      }
  
      const query = `UPDATE note SET title = COALESCE($1, title),data = COALESCE($2, data) WHERE id = $4 RETURNING *;`;
      const { rows } = await pool.query(query, [title, data , id]);
  
      if (rows.length === 0) {
        return res.status(404).send('Cannot find anything');
      }
  
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Some error has occured failed');
    }
  });
  app.delete('/note/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const query = 'DELETE FROM note WHERE id = $1 RETURNING *;';
      const { rows } = await pool.query(query, [id]);
  
      if (rows.length === 0) {
        return res.status(404).send('we have not found the note');
      }
  
      res.status(200).json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('some error has occured');
    }
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})