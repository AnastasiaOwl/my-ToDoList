import {React, useEffect, useState} from 'react';

const useWindowWidth = ()=> {
const [windowWidht, setWindowWidth] = useState(window.innerWidth);

const calculateWindowWidth = () => {
setWindowWidth(window.innerWidth);
}

useEffect = (()=>{
    window.addEventListener('calculateWindowWidth',calculateWindowWidth);
    return () => {
        window.removeEventListener('calculateWindowWidth',calculateWindowWidth)
    };
}, []);

return{windowWidht}
}

export default useWindowWidth;