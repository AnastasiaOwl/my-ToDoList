import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import ToDoEditForm from './ToDoEditForm';
import './style/TodoItem.css';

const ToDoItem = ({ todos, onCheckHandler, onClickDelete, onUpdateTodo }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setShowEditForm(true);
  };

  return (
    <>
    <div className='main'>
      {todos.map((todo) => (
        <div key={todo.id}>
          {!showEditForm || (showEditForm && selectedTodo && selectedTodo.id !== todo.id) ? (
            <div className='todoItem'>
              <div className='text'>
              <input
                type="checkbox"
                checked={todo.checked || false}
                onChange={() => onCheckHandler(todo.id)}
              />
              <div className={todo.checked ? "todo-name checked" : "todo-name"}>{todo.title}</div>
              </div>
              <div className='todoText'>{todo.description}</div>
              <div className='buttonContainer'>
              <button className='button' onClick={() => handleEdit(todo)}><FontAwesomeIcon icon={faPen}/></button>
              <button className='deleteButton' onClick={() => onClickDelete(todo.id)}> <FontAwesomeIcon icon={faTrash}/></button>
              <div className='data'>{todo.creationDate}</div>
              </div>
              
              </div>
          ) : null}
          {showEditForm && selectedTodo && selectedTodo.id === todo.id && (
            <ToDoEditForm
              todo={todo}
              setShowEditForm={setShowEditForm}
              updateTodo={onUpdateTodo}
            />
          )}
        </div>
      ))}
 </div>
 </>
  );
};

export default ToDoItem;