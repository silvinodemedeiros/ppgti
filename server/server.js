const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const PORT = 3000;
const USERNAME = 'admin@admin.com';
const PASSWORD = 'admin';
const AUTH_HEADER = {
    headers: {
        "Content-Type": "application/json",
        Authorization: 'Basic ' + Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64')
    }
};

const WIDGET_URI = '/layout/widget';
const WEATHER_URI = '/climate/weather';
const GRID_URI = '/layout/grid';
const CELL_URI = '/layout/cell';
const TEMPLATE_URI = '/layout/template';

const REMOTE_API_URL = 'http://localhost:8000/api/v1';
const WIDGET_API_URL = REMOTE_API_URL + WIDGET_URI;
const WEATHER_API_URL = REMOTE_API_URL + WEATHER_URI;
const GRID_API_URL = REMOTE_API_URL + GRID_URI;
const CELL_API_URL = REMOTE_API_URL + CELL_URI;
const TEMPLATE_API_URL = REMOTE_API_URL + TEMPLATE_URI;

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());

app.get('/weather', async (req, res) => {
    try {
        const response = await axios.get(WEATHER_API_URL, AUTH_HEADER);

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

app.get('/widget', async (req, res) => {
    try {
        const response = await axios.get(WIDGET_API_URL, AUTH_HEADER);

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

app.get('/widget', async (req, res) => {
    try {
        const id = req.query.id;
        const response = await axios.get(WIDGET_API_URL + '/get_by_id/' + id + '/', AUTH_HEADER);

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

app.post('/widget', async (req, res) => {
    try {
        const response = await axios.post(WIDGET_API_URL + '/create/', req.body.data, AUTH_HEADER);

        res.json({
            message: 'Entity created successfully through remote API',
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

app.delete('/widget', async (req, res) => {
    try {
        const id = req.query.id;

        const response = await axios.delete(WIDGET_API_URL + '/delete_by_id/' + id + '/', AUTH_HEADER);

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

app.get('/grid', async (req, res) => {
    try {
        const response = await axios.get(GRID_API_URL, AUTH_HEADER);

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

app.get('/grid', async (req, res) => {
    try {
        const id = req.query.id;
        const response = await axios.get(GRID_API_URL + '/get_by_id/' + id + '/', AUTH_HEADER);

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

app.post('/grid', async (req, res) => {
    try {
        const response = await axios.post(GRID_API_URL + '/create/', req.body.data, AUTH_HEADER);

        res.json({
            message: 'Entity created successfully through remote API',
            data: response.data
        });
    } catch (error) {
        console.error('Error fetching data from remote API:', error.message);
        res.status(500).json({
            message: 'Failed to fetch data from remote API',
            error
        });
    }
});

app.delete('/grid', async (req, res) => {
    try {
        const id = req.query.id;

        const response = await axios.delete(GRID_API_URL + '/delete_by_id/' + id + '/', AUTH_HEADER);

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

app.get('/cell', async (req, res) => {
    try {
        const id = req.query.id;
        const response = await axios.get(CELL_API_URL + '/get_by_id/' + id +'/', AUTH_HEADER);

        res.json({
            message: 'Data fetched successfully from remote API',
            data: response.data
        });
    } catch (error) {
        console.error('Error fetching data from remote API:', error.message);
        res.status(500).json({
            message: 'Failed to fetch data from remote API',
            error
        });
    }
});

app.post('/cell', async (req, res) => {
    try {
        const response = await axios.post(CELL_API_URL + '/create/', req.body.data, AUTH_HEADER);

        res.json({
            message: 'Entity created successfully through remote API',
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

app.get('/template', async (req, res) => {
    try {
        const response = await axios.get(TEMPLATE_API_URL, AUTH_HEADER);

        res.json({
            message: 'Data fetched successfully from remote API',
            data: response.data
        });
    } catch (error) {
        console.error('Error fetching data from remote API:', error.message);
        res.status(500).json({
            message: 'Failed to fetch data from remote API',
            error
        });
    }
});

app.get('/template', async (req, res) => {
    try {
        const id = req.query.id;
        const response = await axios.get(TEMPLATE_API_URL + '/get_by_id/' + id +'/', AUTH_HEADER);

        res.json({
            message: 'Data fetched successfully from remote API',
            data: response.data
        });
    } catch (error) {
        console.error('Error fetching data from remote API:', error.message);
        res.status(500).json({
            message: 'Failed to fetch data from remote API',
            error
        });
    }
});

app.post('/template', async (req, res) => {
    try {
        const response = await axios.post(TEMPLATE_API_URL + '/create/', req.body.data, AUTH_HEADER);

        res.json({
            message: 'Entity created successfully through remote API',
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

app.delete('/template', async (req, res) => {
    try {
        const id = req.query.id;
        const response = await axios.post(TEMPLATE_API_URL + '/delete_by_id/' + id + '/', AUTH_HEADER);

        res.json({
            message: 'Entity created successfully through remote API',
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
