import express from 'express';

const port = 8000;
const host = '127.0.0.1';

const app = express();

app.get('/', (req, res) => {
    res.send('Стартовая страница')
});

app.get('/hello', (req, res) => {
    res.send('Привет!')
});


app.listen(port, host,() => {
    console.log(`Сервер запущен на ${host}:${port}`);
})

