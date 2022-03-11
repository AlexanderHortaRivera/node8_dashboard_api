import express from 'express';
import {userRouter} from "./users/users.js";

const port = 8000;
const host = '127.0.0.1';

const app = express();

app.get('/hello', (req, res) => {
    //res.send('Привет!')
    //res.status(200).send({success: true, city:123});
    res.redirect(301, "/");
});

app.get('/', (req, res) => {
    //res.send('Привет!')
    res.status(200).send({success: true, city:123});
});

app.use('/users', userRouter);


app.listen(port, host,() => {
    console.log(`Сервер запущен на ${host}:${port}`);
})

