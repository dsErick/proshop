export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)

    res.status('404')
    next(error)
}

export const errorHandler = (err, req, res, next) => {
    // console.error(err)
    // console.log(Object.getOwnPropertyNames(err))
    
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message
    
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        statusCode = 422
        message = `Product not found with the id of ${err.value}`
    }
    
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    })
}
