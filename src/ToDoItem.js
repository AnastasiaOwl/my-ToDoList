import React from 'react';
import './style/TodoItem.css';

const ToDoItem = ({ todos, onCheckHandler, onClickDelete }) => {
  return (
    <div className='main'>
      {todos.map((todo) => (
        <div key={todo.id} className='todoItem'>
          <div className='todo'>
          <input
            type="checkbox"
            checked={todo.checked || false}
            onChange={() => onCheckHandler(todo.id)}
          />
        <p className={todo.checked ? "todo-name checked" : "todo-name"}>{todo.name}</p>
          </div>
          <button className='deleteButton' onClick={() => onClickDelete(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ToDoItem;