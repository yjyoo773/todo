import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

function TodoList(props) {
  return (
    <>
      <ListGroup>
        {props.list.map((item) => (
          <ListGroup.Item
            className={`complete-${item.complete.toString()}`}
            key={item._id}
            variant={item.complete === true ? "danger" : "success"}
            action
          >
            <span onClick={() => props.handleComplete(item._id)}>
              {item.text}
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default TodoList;
