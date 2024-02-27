import React, { useState, useEffect } from 'react';
import ToDoForm from './ToDoForm';
import { useFetch } from './hooks/useFetch';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { format } from 'date-fns';
import ToDoItem from './ToDoItem';
import  './style/ToDo.css';

const ToDoComponentServer = () => {
  const [todos, setTodos] = useState([]);
  const { data: fetchedTodos, isLoading } = useFetch('todos');
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    setTodos(fetchedTodos);
  }, [fetchedTodos]);

  const addTodo = async (newTodo) => {
    const formattedDate = format(new Date(), 'MM/dd/yyyy');
    const payload = {
      ...newTodo,
      id: uuidv4(),
      checked: false, 
      creationDate: formattedDate,
    };

    try {
      await axios.post('todos', payload);
      const updatedTodos = await axios.get('todos');
      setTodos(updatedTodos.data);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const onCheckHandler = async (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, checked: !todo.checked } : todo
    );

    try {
      await axios.put(`todos/${id}`, updatedTodos.find(todo => todo.id === id));
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
   <div className='container'>
        {isLoading ? (
            <div>Loading...</div>
        ) : todos.length === 0 ? (
            <div>
            <p>You currently have no tasks.</p>
            <button onClick={() => setShowAddForm(true)}>Add ToDo</button>
            </div>
        ) : (
        <div>
            <div className='mycontainer'>
            <button onClick={() => setShowAddForm(true)}>Add ToDo</button>
            {showAddForm && (
            <ToDoForm setShowAddForm={setShowAddForm} addTodo={addTodo} />
            )}
        </div>
        <ToDoItem todos={todos} onCheckHandler={onCheckHandler}/>
        </div>
   )}
 </div>
  );
};

export default ToDoComponentServer;
