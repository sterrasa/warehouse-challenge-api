const http = require('http');
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config.db');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.paths = {
            products: '/api/products',
            files: '/api/files'
        }
        //Connect DB
        this.connectDb();
        // Middlewares
        this.middlewares();
        // routes
        this.routes();
    }

    connectDb() {
        dbConection.authenticate()
            .then(() => {
                console.log('Database online');
            })
            .catch(err => {
                console.error('Database error:', err);
            });

        // Call sequelize.sync() to sync models on the database
        dbConection.sync()
            .then(() => {
                console.log('Tables created');
            })
            .catch((error) => {
                console.log('Error syncronizaion on tables:', error);
            });
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        // read and parse json
        this.app.use(express.json());
        // public dir
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.products, require('../routes/products.routes'));
        this.app.use(this.paths.files, require('../routes/files.routes'));
    }

    listen() {
        const server = http.createServer(this.app);

        server.listen(this.port, () => {
            console.log('server running on port: ', this.port);
        });

        return server;
    }

}
module.exports = Server;
