import './style/App.css';
import React, {useEffect, useContext} from 'react';
import {BrowserRouter as Router,Route,Routes,NavLink} from 'react-router-dom';
import {lazy, Suspense} from 'react';
import PrivateRoute from './PrivateRoute';
import { getAllUsers } from './api/api';
import { AuthContext} from './AuthContext/AuthContext';


const Home = lazy(()=>import('./pages/Home'));
const ToDoList = lazy(()=>import('./pages/ToDoList'));
const About = lazy(()=>import('./pages/About'));
const TodosPage = lazy(()=>import('./pages/TodosPage'));
const NotFoundPage = lazy(()=>import('./pages/NotFoundPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));

function App() {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const users = await getAllUsers();
      const storedEmail = localStorage.getItem('loggedInUser');
      const currentUser = users.find(user => user.email === storedEmail);
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

  const handleLoginSuccess = (email) => {
    setIsLoggedIn(true);
    localStorage.setItem('loggedInUser', email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('loggedInUser');
  };
  
  return (
    <Router>
    <div className="App">
    <header className='App-header'>
    {isLoggedIn ? (
            <>
              <NavLink to='/AuthPage' className="App-link" onClick={handleLogout}>SignOut</NavLink>
            </>
          ) : (
            <>
              <NavLink to='/LoginPage' className="App-link" activeClassName="active">Registration</NavLink>
            </>
          )}
          <NavLink to='/' className="App-link" activeClassName="active">Home</NavLink>
          <NavLink to='/About' className="App-link" activeClassName="active">About</NavLink>
          {isLoggedIn && (
            <>
              <NavLink to='/ToDoList' className="App-link" activeClassName="active">ToDo list</NavLink>
            </>
          )}
        </header>
    <Suspense fallback={<div>Loading...</div>}>
      <body className="App-body">
        <Routes>
          <Route path='/LoginPage'element={<LoginPage handleLoginSuccess={handleLoginSuccess}/>} />
          <Route path='/AuthPage'element={<AuthPage handleLoginSuccess={handleLoginSuccess}/>} />
          <Route path='/' element={<Home/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/ToDoList' element={<PrivateRoute><ToDoList/></PrivateRoute>}/>
          <Route path='/TodosPage/:id' element={<PrivateRoute ><TodosPage/></PrivateRoute>} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </body>
      </Suspense>
    </div>
    </Router>
  );
}

export default App;
