import React from "react";
import Card from "react-bootstrap/Card";

import useForm from "../../hooks/form.js";

function TodoForm(props) {


  const [handleSubmit, handleInput, handleChange, values] = useForm(chores);

  function chores(stuffToDo) {
    props.handleSubmit(stuffToDo);
    console.log('this is stufftodo',stuffToDo)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Add To Do Item</Card.Title>
          <form onSubmit={handleSubmit}>
            <label>
              <span>To Do Item</span>
            </label>
            <input
              type="text"
              name="text"
              placeholder="Item Details"
              onChange={handleChange}
            />
            
            <label>
              <span>Assigned To</span>
            </label>
            <input
              type="text"
              name="assignee"
              placeholder="Assignee Name"
              onChange={handleChange}
            />

            <label>
              <span>Difficulty Rating</span>
            </label>
            <input
              defaultValue="1"
              type="range"
              min="1"
              max="5"
              name="difficulty"
              onChange={handleChange}
            />
            <button >
              Add Item
            </button>
          </form>
        </Card.Body>
      </Card>
    </>
  );
}

export default TodoForm;
