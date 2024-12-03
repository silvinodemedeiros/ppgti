const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const PORT = 3000;
const USERNAME = 'admin@admin.com';
const PASSWORD = 'admin';
const REMOTE_API_URL = 'https://fba1-177-20-152-125.ngrok-free.app';

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.get('/api/v1/climate/weather', async (req, res) => {
    try {
        const authHeader = 'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');

        const response = await axios.get(REMOTE_API_URL + '/api/v1/climate/weather', {
            headers: {
                Authorization: authHeader
            }
        });

        res.json({
            message: 'Data fetched successfully from remote API',
            data: response.data
        });
    } catch (error) {
        console.error('Error fetching data from remote API:', error.message);
        res.status(500).json({
            message: 'Failed to fetch data from remote API',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
