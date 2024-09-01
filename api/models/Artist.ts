import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
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

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;