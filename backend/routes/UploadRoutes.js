import { extname } from 'path'
import { Router } from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads/')
    },
    filename: (_, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${extname(file.originalname)}`)
    }
})
const upload = multer({
    storage,
    fileFilter: (_, file, cb) => {
        const fileTypes = /jpg|jpeg|png/

        const ext = !fileTypes.test(extname(file.originalname).toLowerCase())
        const mimetype = !fileTypes.test(file.mimetype)

        if (ext && mimetype) {
            const err = new Error('The image must be a file of types: jpg, jpeg or png')

            err.name = 'MulterError'
            err.code = 'INVALID_FILE_TYPE'
            err.field = file.fieldname
            
            cb(err)
        }

        cb(null, true)
    },
    limits: {
        fileSize: 1000000
    }
})

const router = Router()

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router
