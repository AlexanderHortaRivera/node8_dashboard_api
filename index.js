import express from 'express';

const port = 8000;
const host = '127.0.0.1';

const app = express();

const cb = (req, res, next) => {
    console.log("cb");
    next();
}

const cb2 = (req, res, next) => {
    console.log("cb2");
    next();
}


app.all('/', (req, res, next) => {
   console.log("All");
   next();
});

app.get('/', [cb, cb2, (req, res) => {
    res.send('Стартовая страница');
    console.log("Стартовая страница");
}]);

app.get('/hello', (req, res) => {
    res.send('Привет!')
});


app.listen(port, host,() => {
    console.log(`Сервер запущен на ${host}:${port}`);
})

