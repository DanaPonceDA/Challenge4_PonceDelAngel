/**
 * ============================================================
 * 
 * Dana Elizabeth Ponce Del Angel
 * Project: Challenge 4 RESTful API
 * File: index.js
 * Version: 1.1.0
 * ------------------------------------------------------------
 * Versioning Guidelines:
 *  - Major (1): Initial API setup using Express and MongoDB.
 *  - Minor (1): Added route integration and improved error handling.
 *  - Revision (0): No bug fixes yet.
 * ------------------------------------------------------------
 * Description:
 * This is the main entry point of the application. It sets up
 * the Express server, connects to MongoDB, and mounts the routes.
 * ============================================================
 */

import 'dotenv/config'; // Loads environment variables from .env
import express from 'express';
import mongoose from 'mongoose';
import itemRoutes from './routes/itemRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware to parse incoming JSON requests
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB (DB: Challenge4)');

        // Root Route - Basic API status endpoint
        app.get('/', (req, res) => {
            res.send('Challenge 4 RESTful API is running!');
        });

        // 2. Start the Server
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1); // Stop process if connection fails
    });

// 3. Use Routes
app.use('/api/items', itemRoutes); // All item routes start with /api/items

// 4. Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});
