const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());


const db = mysql.createPool({
    host: 'benserverplex.ddns.net',
    user: 'alunos',
    password: 'senhaAlunos', 
    database: 'alunos_filmes12' 
});

const TABELA = 'alunos_filmes12'; 


app.get('/filmes', async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM ${TABELA}`);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/filmes', async (req, res) => {
    const { title, genre, duration, age_rating } = req.body;
    try {
        const [result] = await db.query(
            `INSERT INTO ${TABELA} (title, genre, duration, age_rating) VALUES (?, ?, ?, ?)`,
            [title, genre, duration, age_rating]
        );
        res.status(201).json({ message: 'Filme inserido com sucesso!', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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