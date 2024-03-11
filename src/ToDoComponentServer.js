import React, { useState, useEffect } from 'react';
import ToDoForm from './ToDoForm';
import { useFetch } from './hooks/useFetch';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { format} from 'date-fns';
import ErrorPage from './pages/ErrorPage';
import ToDoItem from './ToDoItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import Select from './Select';
import  './style/ToDo.css';

const ToDoComponentServer = () => {
  const [todos, setTodos] = useState([]);
  const { data: fetchedTodos, isLoading , error} = useFetch('todos');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Show all');
  const selectOptions =[{id: 1, value:'Show all'},
  {id:2, value:'Show in process'},
  {id:3, value:'Show crossed'},];

  useEffect(() => {
    setTodos(fetchedTodos);
  }, [fetchedTodos]);

  const addTodo = async (newTodo) => {
    const formattedDate = format(new Date(), 'dd/MM/yyyy');
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

  const onClickDelete = async (id) => {
    try {
      await axios.delete(`todos/${id}`);
      setTodos((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (selectedFilter === 'Show in process') {
      return !todo.checked;
    } else if (selectedFilter === 'Show crossed') {
      return todo.checked;
    } else {
      return true;
    }
  });

  const onUpdateTodo = async (id, updatedTodo)=>{
    const formattedDate = format(new Date(), 'dd/MM/yyyy');
    const updatedToDo = {
      ...updatedTodo,
      creationDate: formattedDate,
    };
    try {
      await axios.put(`todos/${id}`, updatedToDo);
      const updatedTodos = await axios.get('todos');
      setTodos(updatedTodos.data);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className='container'>
      {isLoading ? (
        <div>Loading...</div>
      ) : todos.length === 0 ? (
        <div>
          <p>You currently have no tasks.</p>
          <button className='Eye' onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? <FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/>}
          </button>
          {showAddForm && <ToDoForm setShowAddForm={setShowAddForm} addTodo={addTodo} />}
        </div>
      ) : (
        <div className='todoList'>
          <div className='mycontainer'>
          <Select
            selectOptions={selectOptions}
            value={selectedFilter}
            setValue={setSelectedFilter}
          />
            <button className='Eye' onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? <FontAwesomeIcon icon={faEye}/> : <FontAwesomeIcon icon={faEyeSlash}/>}
            </button>
            {showAddForm && <ToDoForm setShowAddForm={setShowAddForm} addTodo={addTodo} />}
          </div>
          <ToDoItem todos={filteredTodos} onCheckHandler={onCheckHandler} onClickDelete={onClickDelete} onUpdateTodo={onUpdateTodo}/>
        </div>
      )}
    </div>
  );
};

export default ToDoComponentServer;
