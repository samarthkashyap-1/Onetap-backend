const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username: String,
    avatar: String,
    email: String,
    links: [
        {
            platform: String,
            link: String,
            id: String,
        },
    ],
    card: Number,
    id: String,
});

profileSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.links = ret.links.map((link) => ({
            platform: link.platform,
            link: link.link,
            id: link.id,
        }));
        delete ret._id;
        delete ret.__v;
    },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
