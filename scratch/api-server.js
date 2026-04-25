// Disable TLS cert verification (local dev only)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import handler from '../api/visualize.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Proxy the Vercel handler
app.post('/api/visualize', async (req, res) => {
    try {
        await handler(req, res);
    } catch (err) {
        console.error('Handler Error:', err);
        res.status(500).json({ error: err.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 API Bridge Server running at http://localhost:${PORT}`);
});
