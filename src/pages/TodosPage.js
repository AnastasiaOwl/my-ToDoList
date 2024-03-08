import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { format} from 'date-fns';
import '../style/TodosPage.css';

import axios from 'axios';

const TodosPage = ({ updateTodo }) => {
  const { id } = useParams();
  const [editedTodo, setEditedTodo] = useState({
    title: '',
    description: '',
    creationDate: '',
  });

  useEffect(() => {
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
    const formattedDate = format(new Date(), 'dd/MM/yyyy');
    editedTodo.creationDate=formattedDate;
    try {
      await axios.put(`todos/${id}`, editedTodo);
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
      <div className='page-form'>
        <div className='items'>
        <label>Title:
        <input  className='form-input'
          type="text"
          placeholder="Title"
          name="title"
          value={editedTodo.title}
          onChange={handleChange}
        />
        </label>
        <label>Description:
        <input className='form-input'
          type="text"
          placeholder="Description"
          name="description"
          value={editedTodo.description}
          onChange={handleChange}
        />
        </label>
        <Link className='button' to="/ToDoList" onClick={handleSaveTodo}><FontAwesomeIcon icon={faSave} /></Link>
        </div>
      </div>
    </>
  )
};

export default TodosPage;
