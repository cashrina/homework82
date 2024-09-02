import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    info: {
        type: String,
        required: false,
    }
});

const Artists = mongoose.model('Artists', ArtistsSchema);
export default Artists;