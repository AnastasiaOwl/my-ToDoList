import React from 'react';

const Select = ({selectOptions,value, setValue})=>{

const handleSelectChange=(event)=>{
    const select = event.target.value;
    setValue(select);
};

    return(<>
    <select onChange={handleSelectChange} name='select' id='select'>
        {selectOptions.map((option)=>(<option key={option.id} value={option.value}>
            {option.value}</option>))}
    </select>
</>)
};
export default Select