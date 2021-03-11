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
    let errors = {}
    
    // Mongoose bad ObjectId - CastError
    if (err.name === 'CastError') {
        statusCode = 422
        message = `Resource not found with the id of ${err.value}`
    }
    
    // Mongoose ValidationError
    if (err.name === 'ValidationError') {
        statusCode = 422
        message = `The given data was invalid`
        
        Object.keys(err.errors).forEach(key => {
            if (typeof errors[key] !== Array) errors[key] = []

            errors[key].push(err.errors[key].message)
        })
    }
    
    // Mongoose unique field duplicate key
    if (err.code === 11000) {
        statusCode = 422
        message = `The given data was invalid`

        const field = Object.keys(err.keyValue)[0]
        errors[field] = [`The ${field} has already been taken`]
    }

    // Multer errors
    if (err.name === 'MulterError') {
        statusCode = 422
        message = 'The given data was invalid'

        switch(err.code) {
            case 'LIMIT_FILE_SIZE':
                errors[err.field] = `The image may not be greater than 1mb`
                break
                
            case 'INVALID_FILE_TYPE':
                errors[err.field] = err.message
                break
        }
    }
    
    res.status(statusCode).json({
        message,
        errors: Object.keys(errors).length === 0 ? undefined : errors,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
    })
}
