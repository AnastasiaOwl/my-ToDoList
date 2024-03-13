import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faFloppyDisk, faEraser} from '@fortawesome/free-solid-svg-icons';
import  './style/ToDo.css';

const ToDoForm = ({ setShowAddForm, addTodo }) => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputCheckbox, setInputCheckbox] = useState(false);

  const handleAddTodo = () => {
    if (!inputTitle) {
      alert('Please enter a title for the ToDo.');
      return;
    }

    const newTodo = {
      title: inputTitle,
      description: inputDescription,
      checked: inputCheckbox,
    };

    addTodo(newTodo);

    // Clear input fields after adding
    setInputTitle('');
    setInputDescription('');
    setInputCheckbox(false);

    // Close the form
    setShowAddForm(false);
  };

  return (
    <>
      <input className='input-name'
        type="text"
        placeholder="Title"
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
      />
      <input className='input-description'
        type="text"
        placeholder="Description"
        value={inputDescription}
        onChange={(e) => setInputDescription(e.target.value)}
      />
      <button className='button' onClick={handleAddTodo}><FontAwesomeIcon icon={faPlusSquare}/></button>
    </>
   
  );
};

export default ToDoForm;
