import axios from 'axios';

axios.defaults.baseURL ='http://localhost:3030/';

export const getTodosList = async () =>{
  const todos = await axios.get('todos');
  return todos.data;
};

export const addTodo = async (todo) => {
  try {
    const response = await axios.post('todos', todo);
    return response.data;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const deleteToDo = async (id) => {
  await axios.delete(`todos/${id}`);
};

export const addUser = async (playload) => {
  const todos = await axios.post('auth',playload);
  return todos.data;
};

export const getAllUsers = async ()=>{
  const todos= await axios.get('auth');
  return todos.data;
}