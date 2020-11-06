import mongoose from 'mongoose'

export default async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
    
        console.log(`MongoDB connected: ${conn.connection.host}\n`.cyan.bold)

    } catch (err) {
        console.error(`Error: ${err.message}`.red.underline.bold)

        process.exit(1)
    }
}