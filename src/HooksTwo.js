import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';

const HooksTwo = () =>{
const [list,setList] = useState ([1,2,3,8,6,7,8,9]);

const memoizedList = useMemo(()=>{
    let sum = 0 ;
    for (let i =0; i<list.length; i++){
    sum = sum +list[i];
}
return sum;
},[list]);

const deleteItem = (index) => {
    setList((prevList) => prevList.filter((_, i) => i !== index));
};

    return (<>
    {list.map((item,index)=>(
        <div key={index} ><p>{item}</p>
        <button onClick = {() => deleteItem(index)}>delete</button>
        </div>
    ))}
    </>)
};

export default HooksTwo;