import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    info: {
        type: String,
    }
});

const Artists = mongoose.model('Artists', ArtistsSchema);
export default Artists;