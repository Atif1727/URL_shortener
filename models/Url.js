import mongoose from "mongoose";
import moment from "moment";

const urlSchema = new mongoose.Schema({
    urlId: {
        type: String,
        required: true
    },
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        defaultValue: 0
    },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: moment().add(30, 'days').toDate() }
});

const Url = mongoose.model('url', urlSchema);

export default Url;