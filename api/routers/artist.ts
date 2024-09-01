import express from 'express';
import Artist from "../models/Artist";
import {ArtistMutation} from "../type";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";

const artistRouter = express.Router();

artistRouter.get('/', async (_req, res, next) => {
    try {
        const artist = await Artist.find();
        return res.send(artist);

    } catch (e) {
        next(e);
    }
});

artistRouter.post('/',imagesUpload.single('image'), async (req, res, next) => {
    try {
        const artistMutation: ArtistMutation = {
            name: req.body.name,
            image: req.file ? req.file.filename : null,
            info: req.body.info,
        }

        const artist = new Artist(artistMutation);
        await artist.save();
        return res.send(artist);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }
        next(e);
    }
});

export default artistRouter;