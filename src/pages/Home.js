import {BrowserRouter as Routes,Route,Router,NavLink} from 'react-router-dom';
import ToDoList from './ToDoList';

const Home =()=>{
    return(
       <>
        <NavLink to='/ToDoList'>Start</NavLink>
        <p>Home</p>
        </>
    )
}

export default Home;