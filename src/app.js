import React from "react";

import SettingProvider from "./context/settings.js";
import ToDo from "./components/todo/todo.js";
import "./styles/core.scss";

export default class App extends React.Component {
  render() {
    return (
      <SettingProvider>
        <ToDo />
      </SettingProvider>
    );
  }
}
