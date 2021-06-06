import React, { useState, useEffect, useContext } from "react";
import { SettingContext } from "../../context/settings.js";
import useAjax from "../../hooks/ajax.js";

import Header from "./header.js"
import Pagination from "./pagination.js";
import TodoForm from "./form.js";
import TodoList from "./list.js";

import Container from "react-bootstrap/Container";

import bg from '../../bg_img.jpeg'

function ToDo() {
  const settingContext = useContext(SettingContext);
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(settingContext.itemPerPage);

  const [handleGet, handlePost, handlePut, handleDelete] = useAjax(list);

  let filtered = settingContext.hide
    ? list.filter((item) => item.complete === false)
    : list;

  filtered = filtered.sort((a, b) =>
    a[settingContext.order] > b[settingContext.order] ? -1 : 1
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

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

  var divStyle = {
    backgroundImage: `url(${bg})`,
    height: "auto",
    minHeight: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "auto",
  };


  return (
    <div style={divStyle}>
      <Header/>
      <Container >
        <header>
          <h2 className="bg-dark m-1 p-3 text-light">
            To Do List Manager ({list.filter((item) => !item.complete).length})
          </h2>
        </header>

        <section className="todo ">
          <div>
            <TodoForm handleSubmit={_addItem} />
          </div>

          <div className="list-container">
            <TodoList
              list={currentItems}
              handleComplete={_putItem}
              handleDelete={_deleteItem}
            />
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={filtered.length}
              paginate={paginate}
            />

          </div>
        </section>
      </Container>
    </div>
  );
}

export default ToDo;
