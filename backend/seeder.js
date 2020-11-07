// import mongoose from 'mongoose'
import dotenv from 'dotenv'
import 'colors'

import connectDB from './config/db.js'

import User from './models/UserModel.js'
import Product from './models/ProductModel.js'
import Order from './models/OrderModel.js'

import products from './data/products.js'
import users from './data/users.js'

// Dotenv setup
dotenv.config()

// Connect MongoDB
connectDB()

const importData = async () => {
    /* 
     * Delete all data in database, then seed with users and products
     *
     */

    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        
        const sampleProducts = products.map(product => ({
            ...product,
            user: adminUser
        }))

        await Product.insertMany(sampleProducts)
        
        console.log(`Data imported`.green.underline.bold)
        process.exit()

    } catch (err) {
        console.log(`${err}`.red.bold)
        process.exit(1)
    }
}

const destroyData = async () => {
    /* 
     * Delete all data in database
     *
     */

    try {
        await User.deleteMany()
        await Product.deleteMany()
        await Order.deleteMany()

        console.log(`Data destroyed`.yellow.underline.bold)
        process.exit()

    } catch (err) {
        console.log(`${err}`.red.bold)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') destroyData()
else importData()
