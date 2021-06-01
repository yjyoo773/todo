import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TodoForm(props) {
  const [item, setItem] = useState({});

  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    props.handleSubmit(item);
    const newItem = {};
    setItem(newItem);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Add To Do Item</Card.Title>
          <Form onSubmit={handleFormSubmit}>
            <Form.Label>
              <span>To Do Item</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="text"
              placeholder="Item Details"
              onChange={handleInputChange}
            />
            <Form.Label>
              <span>Assigned To</span>
            </Form.Label>
            <Form.Control
              type="text"
              name="assignee"
              placeholder="Assignee Name"
              onChange={handleInputChange}
            ></Form.Control>

            <Form.Label>
              <span>Difficulty Rating</span>
            </Form.Label>
            <Form.Control
              defaultValue="1"
              type="range"
              min="1"
              max="5"
              name="difficulty"
              onChange={handleInputChange}
            />
            <Button type="submit" variant="primary" size="sm">
              Add Item
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default TodoForm;
