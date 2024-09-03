import mongoose, {Types} from "mongoose";
import Albums from "./Albums";

const Schema = mongoose.Schema;

const TracksSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    album: {
        type: Schema.Types.ObjectId,
        ref: "Albums",
        validate: async (value: Types.ObjectId) => {
            const track = await Albums.findById(value);
            return Boolean(track);
        },
        message: 'Track doesnt exist const',
        required: true
    },
    duration: {
        type: String,
        required: true,
    },
});

const Tracks = mongoose.model('Tracks', TracksSchema);
export default Tracks;