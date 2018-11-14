import Todo from '../database/Todo';
import User from '../database/User';
import { get_authed_user } from '../util';

async function todos() {
  const todos = await Todo.find().populate('author').lean();
  return todos.map((todo) => {
    return Object.assign({}, todo, {
      _id: todo._id.toString(),
      author: Object.assign(todo.author, {
        _id: todo.author._id.toString()
      })
    });
  });
}

async function users(root, args, ctx) {
  const users = await User.find().lean()
  return users.map((user) => {
    console.log('USER', user)
    return Object.assign({}, user, { _id: user._id.toString() })
  })
}

function info() {
  return 'This is the API for the Sibi example app!'
}

export default { info, todos, users }
