import express from "express";
import cors from 'cors';
import config from "./config";
import artistRouter from "./routers/artists";
import * as mongoose from 'mongoose';
import albumRouter from "./routers/albums";
import trackRouter from "./routers/tracks";

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);

const run = async () => {
    await mongoose.connect(config.database);
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
     process.on('exit', () => {
         mongoose.disconnect();
     });
};

run().catch(console.error);