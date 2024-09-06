import mongoose, {Types} from "mongoose";
import Users from "./Users";
import Tracks from "./Tracks";

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        validate: async (value: Types.ObjectId) => {
            const user = await Users.findById(value);
            return Boolean(user);
        },
        message: 'Track doesnt exist const',
        required: true
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: "Tracks",
        validate: async (value: Types.ObjectId) => {
            const track = await Tracks.findById(value);
            return Boolean(track);
        },
        message: 'Track doesnt exist const',
        required: true
    },
    datetime: {
        type: Date,
        required: true,
    },
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);
export default TrackHistory;

