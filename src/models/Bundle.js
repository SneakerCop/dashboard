import mongoose from 'mongoose';

const bundleSchema = new mongoose.Schema({
  title: String,
  type: String,
  billingPlanID: String,
  production: Boolean,
  active: Boolean,
  price: String,
  stockCount: {
    type: Number,
    default: 100,
  },
  live: Boolean,
  description: String,
  dateCreated: Date,
  roles: [{
    type: String,
  }],
});

const Bundle = mongoose.model('Bundle', bundleSchema);
export default Bundle;