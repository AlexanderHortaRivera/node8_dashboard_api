import express from "express";

const userRouter = express.Router();

userRouter.all('/login', (req, res) => {
   res.send("login");
});

userRouter.all('/register', (req, res) => {
    res.send("register");
});

userRouter.all('/*', (req, res) => {
    res.redirect("/users/login");
});

export {userRouter};
