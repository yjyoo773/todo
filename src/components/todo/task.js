import React from "react";

import Badge from "react-bootstrap/Badge";
import Toast from "react-bootstrap/Toast";

function Task(props) {
  return (
    <li>
      <Toast>
        <Toast.Header closeButton={false}>
          <Badge
            onClick={() => props.handleComplete(props.item._id)}
            className={`complete-${props.item.complete.toString()}`}
          >
            {props.item.complete === true ? "Complete" : "Pending"}
          </Badge>
          <strong className="mr-auto">{props.item.assignee}</strong>

          <button onClick={() => props.handleDelete(props.item._id)}>X</button>
        </Toast.Header>
        <Toast.Body>
          {props.item.text}
          <span className="difficulty">Difficulty: {props.item.difficulty}</span>
        </Toast.Body>
      </Toast>
    </li>
  );
}

export default Task;
