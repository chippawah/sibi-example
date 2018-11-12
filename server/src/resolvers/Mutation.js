import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import { sign_token, get_authed_user } from '../util';
import User from '../database/User';
import Todo from '../database/Todo';

// Helper to format a user before sending it back
function formatUser(user) {
  return {
    token: sign_token(user._id),
    user: Object.assign({}, user._doc, {
      _id: user._id.toString()
    }),
  };
}

// Authentication Mutations
export async function signup(root, { email, password }, ctx) {
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
  return formatUser(user);
}

export async function login(root, { email, password }, ctx) {
  // Tell mongoose to get the password for comparing later
  const user = await User.findOne({ email }, { email: true, password: true });
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
  return formatUser(user);
}

// User Mutations
export async function updateUser(root, { email }, ctx) {
  const authed_user = get_authed_user(ctx);
  if (authed_user) {
    const user = await User.findById(authed_user).lean();
    const updated = Object.assign({}, user, {
      email,
      _id: user._id.toString()
    })
    await User.updateOne({ _id: authed_user }, { email });
    return updated;
  }
}

export async function deleteUser(root, args, ctx) {
  const authed_user = get_authed_user(ctx);
  if (authed_user) {
    const user = await User.findOne({ _id: authed_user }).populate('todos');
    if (!user) {
      throw new Error('The authenticated user was not found in the DB');
    }
    // Remove the user and any of their todos
    user.todos.forEach(async (todo) => {
      await todo.remove();
    })
    await user.remove()
    const formatted = Object.assign({}, user._doc, {
      _id: user._id.toString()
    });
    return formatted;
  }
}

// Todo Mutations
// Helper to format Todo before sending back
function formatTodo(todo) {
   let formatted = Object.assign(todo._doc, {_id: todo._id.toString()});
  if (todo.author._id){
    formatted.author = Object.assign(todo.author, {
      _id: todo.author._id.toString(),
    });
  }
  return formatted
}

export async function createTodo(root, { text }, ctx) {
  // Grab the user id for the author field
  const user = get_authed_user(ctx);
  const author = await User.findById(user);
  if (author && user) {
    const todo = await new Todo({ text, author }).save()
    // Push the todo onto the user doc
    await User.findByIdAndUpdate(author._id, {
      $push: { todos: todo._id.toString() }
    })
    return formatTodo(todo);
  }
  throw new Error('You must be logged in to create a todo')
}

export async function updateTodo(root, { _id, text }, ctx) {
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

export async function deleteTodo(root, { _id }, ctx) {
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
