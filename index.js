
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o MySQL
const db = mysql.createPool({
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos', // Subtitua pela sua senha do MySQL
    database: 'alunos_filmes12'
});

const TABELA = 'alunos_filmes12';

// 1. READ - Listar todos os filmes
app.get('/filmes', async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM ${TABELA}`);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. CREATE - Cadastrar novo filme
app.post('/filmes', async (req, res) => {
    const { title, genre, duration, age_rating } = req.body;
    try {
        const [result] = await db.query(
            `INSERT INTO ${TABELA} (title, genre, duration, age_rating) VALUES (?, ?, ?, ?)`,
            [title, genre, duration, age_rating]
        );
        res.status(201).json({ message: 'Filme criado com sucesso!', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. UPDATE - Editar informações de um filme
app.put('/filmes/:id', async (req, res) => {
    const { id } = req.params;
    const { title, genre, duration, age_rating } = req.body;
    try {
        await db.query(
            `UPDATE ${TABELA} SET title = ?, genre = ?, duration = ?, age_rating = ? WHERE id = ?`,
            [title, genre, duration, age_rating, id]
        );
        res.status(200).json({ message: 'Filme atualizado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. DELETE - Apagar um filme
app.delete('/filmes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query(`DELETE FROM ${TABELA} WHERE id = ?`, [id]);
        res.status(200).json({ message: 'Filme deletado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000! 🚀');
});
