'use strict';

const Pool = require('pg').Pool;
const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const redis = require('redis');
const client = redis.createClient({ host: process.env.REDIS_HOST });

const express = require('express');
const app = express();

const port = process.env.API_PORT;

client.on('connect', function() {
    console.log('Redis client connected');
});

app.get('/', function (req, res) {
    res.json({message: 'Hello World'})
});

app.get('/status', async (req, res) => {
    const postgresQuery = 'SELECT date_trunc(\'second\', current_timestamp - pg_postmaster_start_time()) as uptime;';
    const result = await pool.query(postgresQuery);
    const uptime = result.rows[0].uptime;
    const uptimeString = () => {
        let time = '';

        time += uptime.hours ? `${uptime.hours}h ` : '';
        time += uptime.minutes ? `${uptime.minutes}m ` : '';
        time += uptime.seconds ? `${uptime.seconds}s` : '';

        return time
    };

    res.json({
        status: 'OK',
        postgresUptime: uptimeString(),
        redisConnectedClients: Number(client.server_info.connected_clients)
    });
});



app.listen(port, () => {
    console.log('We are live on ' + port);
});