import mongoose from 'mongoose';

import Todo from './Todo';

const schema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String, select: false },
  todos: [{
    type: String,
    ref: 'Todo',
  }],
});

export default mongoose.model('User', schema);
