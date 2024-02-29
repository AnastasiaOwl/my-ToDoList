import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave} from '@fortawesome/free-solid-svg-icons';

const ToDoEditForm = ({todo, setShowEditForm, updateTodo})=>{
    const [editedTodo, setEditedTodo] = useState({title: todo.title, 
    description: todo.description,});

    const handleSaveTodo = () => {
        updateTodo(todo.id, editedTodo);
        setShowEditForm(false);
      };
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
      
        setEditedTodo({
          ...editedTodo,
          [name]: newValue,
        });
      };
      
    
    return(
        <>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={editedTodo.title}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Description"
        name="description"
        value={editedTodo.description}
        onChange={handleChange}
      />
      <button className='button' onClick={handleSaveTodo}><FontAwesomeIcon icon={faSave} /></button>
        </>
    )
}

export default ToDoEditForm