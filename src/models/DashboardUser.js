import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    identifier: String,
    discordID: String,
    avi: String,
    username: String,
    discriminator: String,
    accessToken: String,
    refreshToken: String
});

const User = mongoose.model('DashboardUser', userSchema);
export default User;