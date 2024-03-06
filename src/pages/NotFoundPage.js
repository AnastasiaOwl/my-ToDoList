import React from 'react';
import {NavLink} from 'react-router-dom';

const NotFoundPage = () =>{
    return(<>
    <p>Page not found</p>
    <NavLink to='/' className="App-link" activeclassname="active">Go to main page</NavLink>
</>)
}

export default NotFoundPage;