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


const REMOTE_API_URL = 'http://localhost:8000/api';

const REGISTER_URI = '/register/';
const TOKEN_URI = '/token/';
const WIDGET_URI = '/layout/widget';
const WEATHER_URI = '/climate/weather';
const GRID_URI = '/layout/grid';
const CELL_URI = '/layout/cell';
const TEMPLATE_URI = '/layout/template';

const REGISTER_API_URL = REMOTE_API_URL + REGISTER_URI;
const TOKEN_API_URL = REMOTE_API_URL + TOKEN_URI;
const WIDGET_API_URL = REMOTE_API_URL + '/v1/' + WIDGET_URI;
const WEATHER_API_URL = REMOTE_API_URL + '/v1/' + WEATHER_URI;
const GRID_API_URL = REMOTE_API_URL + '/v1/' + GRID_URI;
const CELL_API_URL = REMOTE_API_URL + '/v1/' + CELL_URI;
const TEMPLATE_API_URL = REMOTE_API_URL + '/v1/' + TEMPLATE_URI;

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());

app.post('/signup', async (req, res) => {
    try {
        const response = await axios.post(REGISTER_API_URL, req.body.data, AUTH_HEADER);

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
