import bcrypt from 'bcryptjs'

export default [
    {
        name: 'Admin User',
        email: 'admin@proshop.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@proshop.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Jane Doe',
        email: 'jane@proshop.com',
        password: bcrypt.hashSync('123456', 10)
    }
]