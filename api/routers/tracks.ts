import express from "express";
import Tracks from "../models/Tracks";
import mongoose from "mongoose";
import {TrackMutation} from "../type";
import Albums from "../models/Albums";

const trackRouter = express.Router();

trackRouter.get('/', async (req, res, next) => {
    try {
        const { album, artist } = req.query;
        let tracks;
        if (artist) {
            const albums = await Albums.find({ artist });
            const albumId = albums.map(album => album._id);
            tracks = await Tracks.find({ album: { $in: albumId } });
        } else if (album) {
            tracks = await Tracks.find({ album });
        } else {
            tracks = await Tracks.find();
        }

        return res.send(tracks);

    } catch (error) {
        next(error);
    }
});

trackRouter.post('/', async (req, res, next) => {

    try {
        const trackMutation: TrackMutation = {
            name: req.body.name,
            album: req.body.album,
            duration: req.body.duration,
        };

        const track = new Tracks(trackMutation);
        await track.save();
        return res.send(track);

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});



export default trackRouter;