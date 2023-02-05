import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
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
  created: {
    type: String,
    default: `${new Date().toLocaleTimeString('en-US', { timezone: 'Asia/Jakarta' })}, ${new Date().toLocaleDateString('en-US', { timezone: 'Asia/Jakarta' })}`,
  },
});

export default mongoose.model('Url', UrlSchema);
