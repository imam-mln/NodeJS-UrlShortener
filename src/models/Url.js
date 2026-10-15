import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  long_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Url', UrlSchema);
