import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import ToDoEditForm from './ToDoEditForm';
import {Link} from 'react-router-dom';
import './style/TodoItem.css';

const ToDoItem = ({ todos, onCheckHandler, onClickDelete}) => {
  return (
    <div className='main'>
      {todos.map((todo) => (
        <div key={todo.id} className='todoItem'>
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
            <Link className='button' to={`/TodosPage/${todo.id}`}><FontAwesomeIcon icon={faPen} /></Link>
            <button className='deleteButton' onClick={() => onClickDelete(todo.id)}> <FontAwesomeIcon icon={faTrash} /></button>
            <div className='data'>{todo.creationDate}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToDoItem;