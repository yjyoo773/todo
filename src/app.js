import React from 'react';

import ToDo from './components/todo/todo.js';
import './styles/core.scss'

export default class App extends React.Component {
  render() {
    return (
      <>
        <ToDo />
      </>
    );
  }
}
