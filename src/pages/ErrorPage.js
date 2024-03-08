import React from 'react';
import {NavLink} from 'react-router-dom';

const ErrorPage = ()=>{
    return (
        <>
        <p>Something went wrong!</p>
        <NavLink to='/' className="App-link" activeclassname="active">Go to main page</NavLink>
        </>
    )

}
export default ErrorPage; 