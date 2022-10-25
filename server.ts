import express, { Request, Response, NextFunction } from 'express'
require('dotenv').config()
const bodyParser = require('body-parser')

const users = require('./controllers/users')
const blogs = require('./controllers/blogs')
const auth = require('./controllers/auth')
const app = express()
const port = process.env.SERVER_PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/:test', (req: Request, res: Response) => {
    console.log(req.params)
    res.send('server is active')
})

app.post('/api/postUser', users.postUser)
app.get('/api/loginUser', users.loginUser)
// app.post("/api/updateUser", users.updateUser);

app.post('/api/blog/add', auth.verify, blogs.postBlog)
app.get('/api/blog/:id', auth.verify, blogs.getBlog)
// app.get("/api/blog/:id", blogs.getALlBlog);
// app.get("/api/blog/:search_key", blogs.searchBlog);
// app.get("/api/blog/:filter_key", blogs.filterBlog);

app.listen(port, () => {
    console.log(`Server started. Listening on port ${port}`)
})
