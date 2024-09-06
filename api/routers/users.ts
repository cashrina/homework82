import express from "express";
import {randomUUID} from "node:crypto";
import Users from "../models/Users";
import mongoose from "mongoose";

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
    try {
        const user = new Users({
            username: req.body.username,
            password: req.body.password,
            token: randomUUID(),
        });
        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        next(error);
    }
});

usersRouter.post('/session', async (req, res, next) => {
    try {
        const user = await Users.findOne({username: req.body.username});
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            return res.status(400).send({ error: 'Password is wrong' });
        }
        user.generateToken();
        await user.save();

        return res.send(user);
    } catch (error) {
        return next(error);
    }
});

export default usersRouter;