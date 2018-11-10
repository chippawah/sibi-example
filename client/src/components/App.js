import React, { Component } from 'react';

import TodoList from './TodoList';
import UserList from './UserList';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Todos</h1>
        <TodoList />
      </div>
    );
  }
}

export default App;
