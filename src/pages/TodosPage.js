import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const TodosPage = ({ updateTodo }) => {
  const { id } = useParams();
  const [editedTodo, setEditedTodo] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    // Fetch the todo with the given id
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`todos/${id}`);
        setEditedTodo(response.data);
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    };

    fetchTodo();
  }, [id]);

  const handleSaveTodo = async () => {
    try {
      await axios.put(`todos/${id}`, editedTodo);
      // Handle any other save logic here
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setEditedTodo({
      ...editedTodo,
      [name]: newValue,
    });
  };

  return (
    <>
      <div className='form'>
        <label>Title:</label>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={editedTodo.title}
          onChange={handleChange}
        />
        <label className='label'>Description:</label>
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={editedTodo.description}
          onChange={handleChange}
        />
        <Link className='button' to="/ToDoList" onClick={handleSaveTodo}><FontAwesomeIcon icon={faSave} /></Link>
      </div>
    </>
  )
};

export default TodosPage;
