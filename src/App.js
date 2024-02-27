import './style/App.css';
import React, { useState, useEffect } from 'react';
import { getTodosList } from './api/api';


function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading]= useState(false);

  const fetchData =  async () => {
    setIsLoading(true);
    const data = await getTodosList();
    setIsLoading(false);
    setTodos(data);
  };

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="App">
      <header>Hi!</header>
      <body className="App-body">
        <ul>
          {isLoading ? (<div>Loading...</div>) :
        (todos.map((todos)=>(
          <li key={todos.id}>
            {todos.title}
          </li>
        ))
        )}
        </ul>
       {/* <ToDoComponent/> */}
      </body>
    </div>
  );
}

export default App;
