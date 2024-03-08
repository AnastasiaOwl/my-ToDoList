import './style/App.css';
import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router,Route,Routes,NavLink} from 'react-router-dom';
import {lazy, Suspense} from 'react';
import PrivateRoute from './PrivateRoute';
import { getAllUsers } from './api/api';


const Home = lazy(()=>import('./pages/Home'));
const ToDoList = lazy(()=>import('./pages/ToDoList'));
const About = lazy(()=>import('./pages/About'));
const TodosPage = lazy(()=>import('./pages/TodosPage'));
const NotFoundPage = lazy(()=>import('./pages/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const users = await getAllUsers();
      const currentUser = users.find(user => user.login === "inputLogin" && user.email === "inputEmail");
      if (currentUser) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login:', error.message);
      setIsLoggedIn(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  
  return (
    <Router>
    <div className="App">
    <header className='App-header'>
          <NavLink to='/LoginPage' className="App-link" activeClassName="active">Login</NavLink>
          <NavLink to='/' className="App-link" activeClassName="active">Home</NavLink>
          {isLoggedIn && (
            <>
              <NavLink to='/ToDoList' className="App-link" activeClassName="active">ToDo list</NavLink>
              <NavLink to='/About' className="App-link" activeClassName="active">About</NavLink>
            </>
          )}
        </header>
    <Suspense fallback={<div>Loading...</div>}>
      <body className="App-body">
        <Routes>
          <Route path='/LoginPage'element={<LoginPage handleLoginSuccess={handleLoginSuccess} />} />
          <Route path='/' element={<Home/>}/>
          <Route path='/ToDoList' element={<PrivateRoute isAuthenticated={isLoggedIn}><ToDoList/></PrivateRoute>}/>
          <Route path='/About' element={<PrivateRoute isAuthenticated={isLoggedIn}><About/> </PrivateRoute>}/>
          <Route path='/TodosPage/:id' element={<PrivateRoute isAuthenticated={isLoggedIn}><TodosPage/></PrivateRoute>} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </body>
      </Suspense>
    </div>
    </Router>
  );
}

export default App;
