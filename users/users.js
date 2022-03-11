import express from "express";

const userRouter = express.Router();

userRouter.all('/login', (req, res) => {
   res.send("login");
});

userRouter.all('/register', (req, res) => {
    res.send("register");
});

userRouter.all('/*', (req, res) => {
    throw new Error("Неправильный роутинг!");
});


export {userRouter};
