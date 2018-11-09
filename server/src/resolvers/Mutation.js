import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import { sign_token, get_authed_user } from '../util';
import User from '../database/User';
import Todo from '../database/Todo';

// Using .lean() to keep the docs returned from mongo as plain JS objects

// Authentication Mutations
async function signup(root, { email, password }, ctx, info) {
  console.log(`${email} is signing up!`);
  // Ensure the email is not taken already
  let user = await User.findOne({ email }).lean();
  if (user) {
    throw new Error('A user with that email has already signed up.');
  }
  // Hash the password
  const hashed = await bcrypt.hash(password, 10);
  // Save the user to the database
  user = await new User({
    email,
    password: hashed,
  }).save();
  // Get a signed token for the AuthPayload
  const token = sign_token(user._id);
  return { token, user };
}

async function login(root, { email, password }, ctx, info) {
  // Tell mongoose to get the password for comparing later
  const user = await User.findOne({ email }, { password: true }).lean();
  if (!user) {
    throw new Error('The given email does not have an associated user.');
  }
  // Compare the given against what was returned
  const correct_passwd = await bcrypt.compare(password, user.password);
  if (!correct_passwd) {
    throw new Error('Incorrect password!');
  }
  // Clip the password before sending back the user
  delete user.password
  const token = sign_token(user._id);
  return { token, user };
}

// Helper to format Todo before sending back
function formatTodo(todo) {
  let formatted = Object.assign(todo._doc, {_id: todo._id.toString()});
  if (todo.author._id){
    formatted.author = Object.assign(todo.author, {
      _id: todo.author._id.toString()
    });
  }
  return formatted
}

// Todo Mutations
async function createTodo(root, { text }, ctx, info) {
  // Grab the user id for the author field
  const author = get_authed_user(ctx);
  const todo = await new Todo({ text, author }).save()
  return formatTodo(todo);
}

async function updateTodo(root, { _id, text }, ctx, info) {
  const user = get_authed_user(ctx)
  // Ensure the author is the one updating the todo
  const todo = await Todo.findById(_id).populate('author')
  if (todo.author._id.toString() !== user) {
    throw new Error('You must be the author to edit the todo');
  }
  const updated = formatTodo(Object.assign(todo, { text }));
  await Todo.updateOne({ _id }, { text });
  return updated;
}

async function deleteTodo(root, { _id }, ctx, info) {
  const author = get_authed_user(ctx);
  const todo = await Todo.findOne({ _id }).populate('author')
  if (!todo) {
    throw new Error('The given todo id was not found');
  }
  // Ensure the author is the one deleting the todo
  if (todo.author._id.toString() !== author) {
    throw new Error('You must be the author to delete a todo');
  }
  // Remove the todo from the DB
  await todo.remove();
  return formatTodo(todo);
}

export default {
  signup,
  login,
  createTodo,
  updateTodo,
  deleteTodo,
}
