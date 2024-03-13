import { NavLink} from 'react-router-dom';
import '../style/Home.css';
import img from '../image/img.png'

const Home =()=>{
    return(
       <>
       <div className='main-container-home'>
        <p className='text-home'>Welcome to our Todo List App! Stay organized and productive by creating, managing, and prioritizing your tasks effortlessly.
            If you want to start working now click <NavLink className='link' to='/ToDoList'>start</NavLink>.</p>
        <div className='picture-container'>
        <img  className='myimage' src={img} alt="img" />
        </div>
        </div>
        </>
    )
}

export default Home;