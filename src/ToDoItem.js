import React from 'react';
import './style/TodoItem.css';

const ToDoItem = ({ todos, onCheckHandler, onClickDelete }) => {
  return (
    <div style={{ display: 'flex' }}>
      <ul className='ulStyle'>
        {todos.map((todo) => (
          <li className='li' key={todo.id}>
            <input
              type="checkbox"
              checked={todo.checked || false}
              onChange={() => onCheckHandler(todo.id)}
            />
          </li>
        ))}
      </ul>
      <ul className='ulStyle'>
        {todos.map((todo) => (
          <li className='li' key={todo.id} style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}>
            {todo.name}
          </li>
        ))}
      </ul>
      <ul className='ulStyle'>
        {todos.map((todo) => (
          <li className='li' key={todo.id}>
            <button className='deleteButton' onClick={() => onClickDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoItem;