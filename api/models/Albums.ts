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
        ref: "Artist",
        validate: async (value: Types.ObjectId) => {
            const category = await Artists.findById(value);
            return Boolean(category);
        },
        message: 'Artists doesnt exist const',
    },
    year: {
        type: Date,
        required: true,
    },
    image: String,
});

const Albums = mongoose.model('Album', AlbumsSchema);
export default Albums;