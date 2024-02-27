import axios from 'axios';

axios.defaults.baseURL ='http://localhost:3030/';

export const getTodosList = async () =>{
  const todos = await axios.get('todos');
  return todos.data;
};