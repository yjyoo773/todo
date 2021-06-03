import React from "react";
import Badge from "react-bootstrap/Badge";
import Toast from "react-bootstrap/Toast";

function TodoList(props) {
  return (
    <>
      <ul>
        {props.list.map((item) => (
          <li key={item._id}>
            <Toast>
              <Toast.Header closeButton={false}>
                <Badge
                  onClick={() => props.handleComplete(item._id)}
                  className={`complete-${item.complete.toString()}`}
                >
                  {item.complete === true ? "Complete" : "Pending"}
                </Badge>
                <strong className="mr-auto">{item.assignee}</strong>

                <button onClick={() => props.handleDelete(item._id)}>X</button>
              </Toast.Header>
              <Toast.Body>
                {item.text}
                <span className="difficulty">Difficulty {item.difficulty}</span>
              </Toast.Body>
            </Toast>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
