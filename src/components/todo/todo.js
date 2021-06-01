import React, { useState, useEffect } from "react";
import TodoForm from "./form.js";
import TodoList from "./list.js";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "./todo.scss";

function ToDo() {
  const [list, setList] = useState([]);

  const addItem = (item) => {
    item._id = Math.random();
    item.complete = false;
    setList([...list, item]);
  };

  const toggleComplete = (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      let newList = list.map((listItem) =>
        listItem._id === item._id ? item : listItem
      );
      setList(newList);
    }
  };

  useEffect(() => {
    {
      document.title = `To Do List: ${
        list.filter((item) => !item.complete).length
      }`;
    }
  });

  useEffect(() => {
    let initialList = [
      {
        _id: 1,
        complete: false,
        text: "Clean the Kitchen",
        difficulty: 3,
        assignee: "Person A",
      },
      {
        _id: 2,
        complete: false,
        text: "Do the Laundry",
        difficulty: 2,
        assignee: "Person A",
      },
      {
        _id: 3,
        complete: false,
        text: "Walk the Dog",
        difficulty: 4,
        assignee: "Person B",
      },
      {
        _id: 4,
        complete: true,
        text: "Do Homework",
        difficulty: 3,
        assignee: "Person C",
      },
      {
        _id: 5,
        complete: false,
        text: "Take a Nap",
        difficulty: 1,
        assignee: "Person B",
      },
    ];
    setList(initialList);
  }, []);

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
      </Navbar>
      <header>
        <h2>
          To Do List Manager ({list.filter((item) => !item.complete).length}) 
        </h2>
      </header>

      <section className="todo">
        <div>
          <TodoForm handleSubmit={addItem} />
        </div>

        <div>
          <TodoList list={list} handleComplete={toggleComplete} />
        </div>
      </section>
    </>
  );
}

export default ToDo;
