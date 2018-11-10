import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import TodoList from './TodoList';
import UserList from './UserList';
import CreateTodo from './CreateTodo';
import Header from './Header';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>

          <Route exact path='/' component={UserList} />
          <Route exact path="/create" component={CreateTodo} />
          <Route exact path="/todos" component={TodoList} />
        </Switch>
      </div>
    );
  }
}

export default App;
