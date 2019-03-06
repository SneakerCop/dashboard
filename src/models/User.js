import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  key: String,
  dateAdded: Date,
  discordID: String,
  subscriptionID: String,
  email: String,
  paymentToken: String,
  stripeUserID: String,
  bundle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bundle',
  },
  exempt: Boolean,
});

const User = mongoose.model('User', userSchema);
export default User;