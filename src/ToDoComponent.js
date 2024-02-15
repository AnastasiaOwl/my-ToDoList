import React from 'react';
import {useState} from 'react';
import ToDoItem from './ToDoItem';
import { v4 as uuidv4 } from 'uuid';

const ToDoComponent = ()=>{ 
const [todos, setTodos] = useState([
    { id: uuidv4(), name: 'todo1' },
    { id: uuidv4(), name: 'todo2' },
    { id: uuidv4(), name: 'todo3' },
    { id: uuidv4(), name: 'todo4' },
    { id: uuidv4(), name: 'todo5' },
  ]);
const [input, setInput]= useState('');


const onClickAdd = (input) => {
    const newTodo = { id: uuidv4(), name: input };
    setTodos([...todos, newTodo]);
    setInput('');
};

const onClickDelete = () => {
  const updatedTodos = todos.filter((todo) => !todo.checked);
  setTodos(updatedTodos);
};

const onChangeAddInput = (e) => {
const value = e.target.value;
setInput(value);
};

const onEnterHendler = (e) => {
    if (e.key === 'Enter'){
        const newTodo = { id: uuidv4(), name: input };
        setTodos([...todos, newTodo]);
        setInput('');
    }
}

const onCheckHandler = (todoId) => {
  const updatedTodos = todos.map((todo) =>
    todo.id === todoId ? { ...todo, checked: !todo.checked } : todo
  );
  setTodos(updatedTodos);
};


return (
<>
<input onKeyDown ={onEnterHendler} onChange = {onChangeAddInput} value={input}/>
<button onClick = { () => onClickAdd(input)}>Add toDo</button>
   <p>To Do List:</p>
   <ToDoItem todos={todos} onCheckHandler={onCheckHandler}/>
   <button onClick = { () => onClickDelete()}>Delete toDo</button>
   <p>Total Items: {todos.length}</p>
</>
);
};

export default ToDoComponent;