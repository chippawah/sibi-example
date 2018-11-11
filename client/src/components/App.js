import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import TodoList from './Todos/TodoList';
import UserList from './Users/UserList';
import Login from './Login';
import Header from './Header';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={UserList} />
          <Route exact path="/todos" component={TodoList} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
