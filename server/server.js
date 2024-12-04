const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const PORT = 3000;
const USERNAME = 'admin@admin.com';
const PASSWORD = 'admin';
const REMOTE_API_URL = 'https://2da9-177-20-152-125.ngrok-free.app/';

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());

app.get('/weather', async (req, res) => {
    try {
        const authHeader = 'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');

        const response = await axios.get(REMOTE_API_URL + '/api/v1/climate/weather/', {
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

app.get('/widgets', async (req, res) => {
    try {
        const authHeader = 'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');

        const response = await axios.get(REMOTE_API_URL + '/api/v1/layout/widget/', {
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

app.post('/widgets/create', async (req, res) => {
    try {
        const authHeader = 'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');

        const response = await axios.post(REMOTE_API_URL + '/api/v1/layout/widget/', req.body.data, {
            headers: {
                "Content-Type": "application/json",
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

app.delete('/widgets/delete', async (req, res) => {
    try {
        const authHeader = 'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');

        const id = req.query.id;

        const response = await axios.delete(REMOTE_API_URL + '/api/v1/layout/widget/delete_by_id/'+id+'/', {
            headers: {
                "Content-Type": "application/json",
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
