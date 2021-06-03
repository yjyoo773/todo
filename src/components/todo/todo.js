import React, { useState, useEffect } from "react";

import useAjax from "../../hooks/ajax.js";
import TodoForm from "./form.js";
import TodoList from "./list.js";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function ToDo() {
  const [list, setList] = useState([]);

  const [handleGet, handlePost, handlePut, handleDelete] = useAjax(list);

  const _addItem = async (item) => {
    handlePost(item, (newItem) => setList([...list, newItem]));
  };

  const _putItem = async (id) => {
    handlePut(id, (update) => setList(update));
  };

  const _deleteItem = async (id) => {
    handleDelete(id, (del) => setList(del));
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
