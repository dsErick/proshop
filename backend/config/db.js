import mongoose from 'mongoose'

export default async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
    
        console.log(`MongoDB connected: \x1b[36m${conn.connection.host}\x1b[0m`)

    } catch (err) {
        console.error(`\x1b[31mError: ${err.message}\x1b[0m`)
        
        process.exit(1)
    }
}