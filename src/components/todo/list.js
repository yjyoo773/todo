import React from "react";

import Task from "./task.js";

function TodoList(props) {
  return (
    <>
      <ul>
        {props.list.map((item) => (
          <Task
            item={item}
            handleComplete={props.handleComplete}
            handleDelete={props.handleDelete}
            key={item._id}
          />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
