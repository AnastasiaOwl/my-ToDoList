import './style/App.css';
import {BrowserRouter as Router,Route,Routes,NavLink} from 'react-router-dom';
import Home from './pages/Home'
import ToDoList from './pages/ToDoList';
import About from './pages/About';
import TodosPage from './pages/TodosPage';



function App() {
  return (
    <Router>
    <div className="App">
    <header className='App-header'>
          <NavLink to='/' className="App-link" activeclassname="active">Home</NavLink>
          <NavLink to='/ToDoList' className="App-link" activeclassname="active">ToDo list</NavLink>
          <NavLink to='/About' className="App-link" activeclassname="active">About</NavLink>
    </header>
      <body className="App-body">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/ToDoList' element={<ToDoList/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/TodosPage/:id' element={<TodosPage/>} />
        </Routes>
      </body>
    </div>
    </Router>
  );
}

export default App;
