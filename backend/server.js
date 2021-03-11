import { join, resolve } from 'path'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import 'colors'

import connectDB from './config/db.js'

import { notFound, errorHandler } from './middleware/errorHandler.js'

import OrderRoutes from './routes/OrderRoutes.js'
import ProductRoutes from './routes/ProductRoutes.js'
import UploadRoutes from './routes/UploadRoutes.js'
import UserRoutes from './routes/UserRoutes.js'


// Dotenv setup
dotenv.config()

// Connect MongoDB
connectDB()

// Express initialized 
const app = express()

// HTTP Request logger for dev mode
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

app.use(express.json())
app.use('/uploads', express.static(join(resolve(), '/uploads')))


// API routes
app.get('/', (req, res) => {
    res.status(200).json({
        data: 'API is Running'
    })
})

app.use('/api/orders', OrderRoutes)
app.use('/api/products', ProductRoutes)
app.use('/api/uploads', UploadRoutes)
app.use('/api/users', UserRoutes)

// PayPal ClientId
app.get('/api/config/paypal', (_, res) => res.json(process.env.PAYPAL_CLIENT_ID))

// Custom Error Handler Middleware
app.use(notFound, errorHandler)


// Listening for a port 
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`\nServer running in "${process.env.NODE_ENV}" mode on port "${PORT}"`.yellow.bold))
