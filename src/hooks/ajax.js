import axios from "axios";

const useAjax = () => {
  const todoAPI = "https://ellis-api-server.herokuapp.com/todo";

  const handleGet = async (action) => {
    let getList = await axios.get(todoAPI);
    let data = getList.data;
    action(data);
  };

  const handlePost = async (item, action) => {
    item.due = new Date();
    item.complete = false;

    try {
      let newItem = await axios.post(todoAPI, item);
      action(newItem.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePut = async (id, item, action) => {
    try {
      let updatedItem = await axios.put(`${todoAPI}/${id}`, item);
      action(updatedItem.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id,action) => {
      try{
        await axios.delete(`${todoAPI}/${id}`)
        action()
      } catch(e){
          console.error(e)
      }

  };

  return [handleGet, handlePost, handlePut, handleDelete];
};
export default useAjax;
