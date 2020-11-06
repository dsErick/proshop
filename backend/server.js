import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import 'colors'

import connectDB from './config/db.js'
import products from './data/products.js'

// Dotenv setup
dotenv.config()

// Connect MongoDB
connectDB()

// Express initialized 
const app = express()

// HTTP Request logger for dev mode
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// API routes
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: 'API is Running'
    })
})

app.get('/api/products', (req, res) => {
    res.status(200).json({
        success: true,
        data: products
    })
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)

    let response = {
        success: true,
        data: product
    }

    if (product === undefined) {
        response = {
            success: false,
            message: `Product not found with the id of ${req.params.id}`
        }
    }

    res.status(response.success ? 200 : 404).json(response)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`\nServer running in "${process.env.NODE_ENV}" mode on port "${PORT}"`.yellow.bold))
