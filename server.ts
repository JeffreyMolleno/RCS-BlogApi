import express, { Request, Response, NextFunction } from 'express';
require("dotenv").config();
const bodyParser = require("body-parser");

const users = require("./controllers/users");
const app = express();
const port = process.env.SERVER_PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/:test', (req:Request, res:Response) => {
    console.log(req.params)
    res.send('server is active');
})

app.post("/api/postUser", users.postUser);
app.get("/api/loginUser", users.loginUser);


app.listen(port, () => {
    console.log(`Server started. Listening on port ${port}`);
  });
  