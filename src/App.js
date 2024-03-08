import './style/App.css';
import {BrowserRouter as Router,Route,Routes,NavLink} from 'react-router-dom';
import {lazy, Suspense} from 'react';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthContext';
// import Home from './pages/Home'
// import ToDoList from './pages/ToDoList';
// import About from './pages/About';
// import TodosPage from './pages/TodosPage';
// import NotFoundPage from './pages/NotFoundPage';

const Home = lazy(()=>import('./pages/Home'));
const ToDoList = lazy(()=>import('./pages/ToDoList'));
const About = lazy(()=>import('./pages/About'));
const TodosPage = lazy(()=>import('./pages/TodosPage'));
const NotFoundPage = lazy(()=>import('./pages/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

function App() {
  return (
    <Router>
    <div className="App">
    <header className='App-header'>
          <NavLink to='/' className="App-link" activeclassname="active">Home</NavLink>
          <NavLink to='/ToDoList' className="App-link" activeclassname="active">ToDo list</NavLink>
          <NavLink to='/About' className="App-link" activeclassname="active">About</NavLink>
    </header>
    <Suspense fallback={<div>Loading...</div>}>
      <body className="App-body">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/ToDoList' element={<ToDoList/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/TodosPage/:id' element={<TodosPage/>} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </body>
      </Suspense>
    </div>
    </Router>
  );
}

export default App;
