import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    identifier: String,
    discordID: String,
    avi: String,
    username: String,
    discriminator: String
});

const User = mongoose.model('BanditUser', userSchema);
export default User;