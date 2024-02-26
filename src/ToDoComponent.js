import React from 'react';
import {useState} from 'react';
import ToDoItem from './ToDoItem';
import  './style/ToDo.css';
import Select from './Select';
import { v4 as uuidv4 } from 'uuid';

const ToDoComponent = ()=>{ 
const [todos, setTodos] = useState([]);
const [input, setInput]= useState('');
const [selectedFilter, setSelectedFilter] = useState('Show all');
const selectOptions =[{id: 1, value:'Show all'},
{id:2, value:'Show in process'},
{id:3, value:'Show crossed'},];

const onClickAdd = (input) => {
  if (input.trim().length < 3) {
    alert('Please enter a valid to-do item (more then 2 symbols)');
    return;
  }
  if (input.trim().length > 51) {
    alert('Please enter a valid to-do item (less then 50 symbols)');
    return;
  }
    const newTodo = { id: uuidv4(), name: input };
    setTodos([...todos, newTodo]);
    setInput('');
};

const onChangeAddInput = (e) => {
const value = e.target.value;
setInput(value);
};

const onEnterHendler = (e) => {
    if (e.key === 'Enter'){
      if (input.trim().length < 3) {
        alert('Please enter a valid to-do item (more then 2 symbols)');
        return;
      }
      if (input.trim().length > 51) {
        alert('Please enter a valid to-do item (less then 50 symbols)');
        return;
      }
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

const onClickDelete = (id) => {
  const updatedTodos = todos.filter((todo) => todo.id !== id); 
  setTodos(updatedTodos);
};

const filteredTodos = todos.filter((todo) => {
  if (selectedFilter === 'Show in process') {
    return !todo.checked;
  } else if (selectedFilter === 'Show crossed') {
    return todo.checked;
  } else {
    return true;
  }
});


return (
<>  
      <div className='container'>
      <p>To Do List:</p>
          <Select
            selectOptions={selectOptions}
            value={selectedFilter}
            setValue={setSelectedFilter}
          />
        <input className='input'  placeholder="Enter to do" onKeyDown ={onEnterHendler} onChange = {onChangeAddInput} value={input}/>
        <button className='button' onClick = { () => onClickAdd(input)}>Add toDo</button> 
      <ToDoItem todos={filteredTodos} onCheckHandler={onCheckHandler} onClickDelete ={onClickDelete} />
    </div>
    </>
  );
};

export default ToDoComponent;