import pool from '../config/database';

const createBuyTable = async () => {
  const client = await pool.connect();
  try {
    const queryText = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        cpf VARCHAR(100) UNIQUE NOT NULL,
        address VARCHAR(100) NOT NULL,
        total VARCHAR(100) NOT NULL
      );
    `;
    await client.query(queryText);
    console.log('Tabela "buy" criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabela:', err);
  } finally {
    client.release();
  }
};

createBuyTable().then(() => process.exit(0));