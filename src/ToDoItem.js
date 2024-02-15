import React from 'react';

const ToDoItem = ({todos, onCheckHandler})=>{
return(
    <ul>{todos.map((todo)=>(
    <li key ={todo.id}>
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={() => onCheckHandler(todo.id)}
          />
          {todo.name}</li>))}
    </ul>
);
};

export default ToDoItem;