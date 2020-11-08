import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import 'colors'

import connectDB from './config/db.js'

// Dotenv setup
dotenv.config()

// Connect MongoDB
connectDB()

// Express initialized 
const app = express()

// HTTP Request logger for dev mode
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

/* 
 * API routes
 */
import ProductRoutes from './routes/ProductRoutes.js'

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: 'API is Running'
    })
})

app.use('/api/products', ProductRoutes)


// Listening for a port 
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`\nServer running in "${process.env.NODE_ENV}" mode on port "${PORT}"`.yellow.bold))
