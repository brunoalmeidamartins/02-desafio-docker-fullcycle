const express = require('express');
const mysql   = require('mysql2/promise');

const app = express();
const port = 3000;

async function withDatabase(fn) {
  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  try {
    return await fn(conn);
  } finally {
    await conn.end();
  }
}

app.get('/', async (req, res) => {
  // Insert Register in the DB
  await withDatabase(conn =>
    conn.execute('INSERT INTO people (name) VALUES (?)', ['Fulano'])
  );

  // Get all names
  const [rows] = await withDatabase(conn =>
    conn.execute('SELECT name FROM people')
  );

  // Mount HTML result
  const nomes = rows.map(r => `<li>${r.name}</li>`).join('');
  res.send(`<h1>Full Cycle Rocks!</h1><ul>${nomes}</ul>`);
});

app.listen(port, () => {
  console.log(`App running port: ${port}`);
});
