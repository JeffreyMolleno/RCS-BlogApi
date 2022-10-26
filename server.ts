require('dotenv').config()
import express, { Request } from 'express'
import multer from 'multer'

const users = require('./controllers/users')
const blogs = require('./controllers/blogs')
const auth = require('./controllers/auth')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.SERVER_PORT
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

var storage = multer.diskStorage({
    destination: async (
        req: Request,
        _,
        callBack: (error: Error | null, destination: string) => void
    ) => {
        const data = JSON.parse(JSON.stringify(req.body))
        if (await auth.verify2(data, req.headers.authorization)) {
            callBack(null, './public/uploads/')
        } else {
            callBack(new Error('Credentials not verified'), '')
        }
    },
    filename: (
        _,
        file: Express.Multer.File,
        callBack: (error: Error | null, filename: string) => void
    ) => {
        callBack(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        )
    },
})

var data: multer.Multer = multer({
    storage: storage,
})

// User Endpoints
app.post('/api/postUser', data.none(), users.postUser)
app.get('/api/loginUser', data.none(), users.loginUser)
// Blog Endpoints
app.post('/api/blog/add', data.single('image'), auth.verify, blogs.postBlog)
app.get('/api/blog/:blog_id', blogs.getBlog)
app.get('/api/blog', blogs.getALlBlogs)
app.post('/api/blog/update', data.none(), auth.verify, blogs.updateBlog)
app.delete('/api/blog/delete', data.none(), auth.verify, blogs.deleteBlog)
app.get('/api/blog/filter/:filter_key', blogs.filterBlog)
app.get('/api/blog/search/:search_key', blogs.searchBlog)

app.listen(port, () => {
    console.log(`Server started. Listening on port ${port}`)
})
