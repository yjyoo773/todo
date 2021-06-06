import React from "react";

import SettingProvider from "./context/settings.js";
import ToDo from "./components/todo/todo.js";
import "./styles/core.scss";

import bg from './bg_img.jpeg'

export default class App extends React.Component {
  render() {
    var divStyle = {
      backgroundImage: `url(${bg})`,
      height: "auto",
      minHeight: "100vh",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      overflow: "auto",
    };
    return (
      <SettingProvider >
        <ToDo style={divStyle}/>
      </SettingProvider>
    );
  }
}
