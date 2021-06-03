import axios from "axios";

const useAjax = (list) => {
  const todoAPI = "https://ellis-api-server.herokuapp.com/todo";

  const handleGet = async (action) => {
    try {
      let getList = await axios.get(todoAPI);
      let data = getList.data;
      action(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePost = async (item, action) => {
    try {
      item.due = new Date();
      item.complete = false;
      let newItem = await axios.post(todoAPI, item);
      action(newItem.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePut = async (id, action) => {
    try {
      let item = list.filter((i) => i._id === id)[0] || {};
      if (item._id) {
        item.complete = !item.complete;
        let updatedItem = await axios.put(`${todoAPI}/${id}`, item);
        let data = updatedItem.data;
        action(
          list.map((listItem) => (listItem._id === data._id ? data : listItem))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id, action) => {
    try {
      let item = list.filter((i) => i._id === id)[0] || {};
      await axios.delete(`${todoAPI}/${id}`);
      action(list.filter((el) => el._id !== item._id));
    } catch (e) {
      console.error(e);
    }
  };

  return [handleGet, handlePost, handlePut, handleDelete];
};

export default useAjax;
