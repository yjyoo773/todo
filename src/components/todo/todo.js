import React, { useState, useEffect, useContext } from "react";
import { SettingContext } from "../../context/settings.js";
import useAjax from "../../hooks/ajax.js";

import Pagination from "./pagination.js";
import TodoForm from "./form.js";
import TodoList from "./list.js";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";

function ToDo() {
  const settingContext = useContext(SettingContext);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(settingContext.itemPerPage);


  const [handleGet, handlePost, handlePut, handleDelete] = useAjax(list);

  let filtered = settingContext.hide
    ? list.filter((item) => item.complete === false)
    : list;

  filtered = filtered.sort((a, b) =>
    a[settingContext.order] > b[settingContext.order] ? -1 : 1
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filtered.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <header>
          <h2 className="text-center bg-dark m-1 p-3 text-light">
            To Do List Manager ({list.filter((item) => !item.complete).length})
          </h2>
        </header>
      <Container>

        <section className="todo ">
          <div>
            <TodoForm handleSubmit={_addItem} />
          </div>

          <div className="list-container">
            <TodoList
              list={currentPosts}
              handleComplete={_putItem}
              handleDelete={_deleteItem}
            />
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={filtered.length}
              paginate={paginate}
            />
            <button className="toggle-hide"
              onClick={(e) => settingContext.changeHide(!settingContext.hide)}
            >
              Toggle to Show Completed
            </button>
          <Dropdown onSelect={e=>settingContext.changeOrder(e)}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Sort Order
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey='assignee'>Name</Dropdown.Item>
              <Dropdown.Item eventKey='text'>Chore</Dropdown.Item>
              <Dropdown.Item eventKey='difficulty'>Difficulty</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>

        </section>
      </Container>
    </>
  );
}

export default ToDo;
