
import express from 'express';
import pool from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota para obter todos os usuários
app.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Rota para adicionar um novo usuário
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const queryText = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *';
    const { rows } = await pool.query(queryText, [name, email]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar usuário' });
  }
});
app.get('/books', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM books');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});
app.post('/books', async (req, res) => {
  const { title, author, price } = req.body;
  try {
    const queryText = 'INSERT INTO books(title, author, price) VALUES($1, $2, $3) RETURNING *';
    const { rows } = await pool.query(queryText, [title, author, price]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar livro' });
  }
});

app.get('/buy', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM buy');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar a compra' });
  }
});
app.post('/books', async (req, res) => {
  const { name, cpf, address, total } = req.body;
  try {
    const queryText = 'INSERT INTO buy(name, cpf, address, total) VALUES($1, $2, $3, $4) RETURNING *';
    const { rows } = await pool.query(queryText, [name, cpf, address, total]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar a compra'});
  }
});
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});