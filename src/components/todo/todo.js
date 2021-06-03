import React, { useState, useEffect } from "react";

import useAjax from "../../hooks/ajax.js";
import TodoForm from "./form.js";
import TodoList from "./list.js";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

// import "./todo.scss";


function ToDo() {
  const [list, setList] = useState([]);

  const [handleGet, handlePost, handlePut, handleDelete] = useAjax();

  const _addItem = async (item) => {
    handlePost(item, (newItem) => setList([...list, newItem]));
    console.log(item);
  };

  const _putItem = async (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;

      handlePut(id, item, (update) =>
        setList(
          list.map((listItem) => (listItem._id === item._id ? item : listItem))
        )
      );
    }
  };

  const _deleteItem = async (id) => {
    let item = list.filter((i) => i._id === id)[0] || {};
    handleDelete(id,del =>setList(list.filter((el) => el._id !== item._id)))

  };

  useEffect(() => {
    handleGet((data) => setList(data));
  }, []);

  useEffect(() => {
    {
      document.title = `To Do List: ${
        list.filter((item) => !item.complete).length
      }`;
    }
  });

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link href="#">Home</Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <header>
          <h2 className="text-center bg-dark m-1 p-3 text-light">
            To Do List Manager ({list.filter((item) => !item.complete).length})
          </h2>
        </header>

        <section className="todo ">
          <div>
            <TodoForm handleSubmit={_addItem} />
          </div>

          <div className="list-container">
            <TodoList
              list={list}
              handleComplete={_putItem}
              handleDelete={_deleteItem}
            />
          </div>
        </section>
      </Container>
    </>
  );
}

export default ToDo;
