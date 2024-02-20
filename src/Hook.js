import React, { useEffect} from 'react';
import  { useLayoutEffect } from 'react';
import  {useState} from 'react';
import  {useRef} from 'react';
import {memo} from 'react';


const Hook = memo(()=>{
    const [paragraphCount, setParagraphCount] = useState(0);
    const [names, setNames] =useState([ {name: 'Ira'}, {name: 'Vicka'}, {name:'Masha'},{name:'Lena'},{name:'Kate'},]);
    const inputRef = useRef(null);
    
    const focusInput = () => {
    inputRef.current.focus();
    console.log('Hi');
  };

  const blurInput = () => {
    inputRef.current.blur();
  };


    useEffect(()=>{
        console.log('Hooks useEffect');
    },[])
    
    useLayoutEffect(() => {
    const paragraph = document.createElement('p');
    paragraph.textContent = `Paragraph ${paragraphCount}`;
    document.body.appendChild(paragraph);

    return () => {
      document.body.removeChild(paragraph);
    };
  }, [paragraphCount]);

  const sayHi = (name)=>{
    console.log(`Hi ${name}`)
  }
  
 

return (
    <>
    {/* <button onClick = {()=>setParagraphCount(paragraphCount + 1)}>Add</button>
    <button  onClick={() => sayHi(names[Math.floor(Math.random() * names.length)].name)}>Say Hi </button> */}
     <input type="text" ref={inputRef} />
     <button onClick={focusInput}>Focus</button>
     <button onClick={blurInput}>Blur</button>
    </>
  );
});

export default Hook;