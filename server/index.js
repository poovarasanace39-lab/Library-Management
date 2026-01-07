require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'library_db',
    password: process.env.DB_PASSWORD || 'password',
    port: process.env.DB_PORT || 5432,
});

pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Database connection error:', err.stack));

// Basic Routes
app.get('/', (req, res) => {
    res.send('Library System API Running');
});

// Mock Auth Route (Replace with DB logic later)
app.post('/api/login', async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email, role]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials or role' });
        }
        const user = result.rows[0];
        // In real app, check password hash
        if (user.password !== password) {
             return res.status(401).json({ message: 'Invalid password' });
        }
        res.json({ user: { id: user.id, name: user.name, role: user.role, email: user.email } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Books Routes
app.get('/api/books', async (req, res) => {
    try {
        const { query } = req.query;
        let sql = 'SELECT * FROM books';
        let params = [];
        if (query) {
            sql += ' WHERE title ILIKE $1 OR author ILIKE $1 OR isbn ILIKE $1 OR subject ILIKE $1';
            params.push(`%${query}%`);
        }
        const result = await pool.query(sql, params);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching books' });
    }
});

app.post('/api/books', async (req, res) => {
    const { title, author, isbn, subject, volume, total_copies } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO books (title, author, isbn, subject, volume, total_copies, available_copies) VALUES ($1, $2, $3, $4, $5, $6, $6) RETURNING *',
            [title, author, isbn, subject, volume, total_copies]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error adding book' });
    }
});

// Transactions Routes (Simplified)
app.get('/api/transactions/my/:userId', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT t.*, b.title, b.author 
            FROM transactions t
            JOIN books b ON t.book_id = b.id
            WHERE t.user_id = $1
            ORDER BY t.due_date ASC
        `, [req.params.userId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching history' });
    }
});

app.post('/api/transactions/issue', async (req, res) => {
    const { user_id, book_id } = req.body;
    try {
        // 1. Check availability
        const bookCheck = await pool.query('SELECT available_copies FROM books WHERE id = $1', [book_id]);
        if (bookCheck.rows[0].available_copies <= 0) {
            return res.status(400).json({ message: 'Book not available' });
        }

        // 2. Reduce details
        await pool.query('UPDATE books SET available_copies = available_copies - 1 WHERE id = $1', [book_id]);

        // 3. Create transaction (Due in 14 days)
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
        
        const result = await pool.query(
            'INSERT INTO transactions (user_id, book_id, due_date) VALUES ($1, $2, $3) RETURNING *',
            [user_id, book_id, dueDate]
        );
        
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Issue failed' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
