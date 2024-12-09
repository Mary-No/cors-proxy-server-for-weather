import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.get('/proxy', async (req, res) => {
    const { city, lang } = req.query;
    const username = process.env.USERNAME_GEONAMES;

    const url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=8&style=LONG&username=${username}&type=json&fuzzy=0.5&lang=${lang}&searchlang=${lang}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`GeoNames API Error: ${response.statusText}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server running at http://localhost:${PORT}`);
});