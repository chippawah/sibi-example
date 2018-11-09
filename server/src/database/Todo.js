import mongoose from 'mongoose';
import User from './User';

const schema = new mongoose.Schema({
  text: String,
  author: {
    type: String,
    ref: 'User',
  },
});

export default mongoose.model('Todo', schema);
