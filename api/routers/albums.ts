import express from "express";
import {imagesUpload} from "../multer";
import mongoose from "mongoose";
import {AlbumMutation} from "../type";
import Albums from "../models/Albums";

const albumRouter = express.Router();

albumRouter.get('/', async (req, res, next) => {
    try {
        const { artist } = req.query;

        if (artist) {
            const albums = await Albums.find({ artist });
            return res.send(albums);
        }

        const albums = await Albums.find();
        return res.send(albums);
    } catch (error) {
        next(error);
    }
});

albumRouter.get('/:id', async (req, res, next) => {
    try {
       const album = await Albums.findById(req.params.id);

       if (album === null) {
           return res.status(404).send({ error: 'Album not found' });
       }
       return res.send(album);
    } catch (error) {
        next(error);
    }
});

albumRouter.post('/',imagesUpload.single('image'), async (req, res, next) => {
    try {
        const albumMutation: AlbumMutation = {
            name: req.body.name,
            artist: req.body.artist,
            year: req.body.year,
            image: req.file ? req.file.filename : null,
        };
        const album = new Albums(albumMutation);
        await album.save();
        return res.send(album);

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});



export default albumRouter;

