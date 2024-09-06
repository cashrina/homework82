import express from "express";
import Users from "../models/Users";
import Tracks from "../models/Tracks";
import TrackHistory from "../models/Track_history";
import mongoose from "mongoose";

const track_historyRoute = express.Router();

track_historyRoute.post('/', async (req, res, next) => {
    try {
        const headerValue = req.get('Authorization');
        if (!headerValue) {
            return res.status(401).send({ error: 'Unauthorized: No token provided' });
        }

        const [_bearer, token] = headerValue.split(' ');
        if (!token) {
            return res.status(401).send({ error: 'Unauthorized: Token not found' });
        }

        const user = await Users.findOne({ token });
        if (!user) {
            return res.status(401).send({ error: 'Unauthorized: Invalid token' });
        }

        const { track } = req.body;
        if (!track) {
            return res.status(400).send({ error: 'Bad Request: Track ID is required' });
        }

        const validTrack = await Tracks.findById(track);
        if (!validTrack) {
            return res.status(400).send({ error: 'Bad Request: Invalid track ID' });
        }

        const trackHistory = new TrackHistory({
            user: user._id,
            track: track,
            datetime: new Date(),
        });

        await trackHistory.save();
        return res.status(201).send(trackHistory);

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        next(error);
    }
});

export default track_historyRoute;