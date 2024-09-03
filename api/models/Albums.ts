import mongoose, {Types} from 'mongoose';
import Artists from "./Artists";

const Schema = mongoose.Schema;

const AlbumsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: "Artists",
        validate: async (value: Types.ObjectId) => {
            const album = await Artists.findById(value);
            return Boolean(album);
        },
        message: 'Artists doesnt exist const',
        required: true,
    },
    year: {
        type: Date,
        required: true,
    },
    image: String,
});

const Albums = mongoose.model('Albums', AlbumsSchema);
export default Albums;