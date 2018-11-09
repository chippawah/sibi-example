import Todo from '../database/Todo';
import { get_authed_user } from '../util';

async function todos(root, { _id, author }, ctx, info) {
  console.log('Getting todos.');
  const user = get_authed_user(ctx);
  const todos = await Todo.find({ author: user }).populate('author').lean();
  const formatted = todos.map((todo) => {
    return Object.assign({}, todo, {
      _id: todo._id.toString(),
      author: Object.assign(todo.author, {
        _id: todo.author._id.toString()
      })
    });
  });
  return formatted
}

function info() {
  return 'This is the API for the Sibi example app!'
}

export default { info, todos }
