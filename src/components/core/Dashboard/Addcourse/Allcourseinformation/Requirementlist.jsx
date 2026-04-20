import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const Requirementlist = ({ name, setValue, getValues, label, errors, register }) => {

    const [requirement,setrequirement] = useState("");
    const [requirementlist,setrequirementlist]=useState([]);

    const addrequirement=()=>{
        if(requirement){
            setrequirementlist([...requirementlist,requirement]);
            setrequirement("");
        }
    }

    const removerequirement=(index)=>{
        const updatedlist=[...requirementlist];
        updatedlist.splice(index,1);
        setrequirementlist(updatedlist);
    }

    useEffect(()=>{
        setValue(name, requirementlist);
    },[requirementlist])

      useEffect(() => {
        register(name, { required: true });
      }, []);

      useEffect(() => {
        const data = getValues(name);
        if (data && data.length > 0) {
          setrequirementlist(data);
        }
      }, []);


    return (
      <div className="text-red-700">
        <label htmlFor={name}>{label}</label>
        <input
          type="text"
          id={name}
          value={requirement}
          placeholder={`Enter instructions`}
          onChange={(e) => {
            setrequirement(e.target.value);
          }}
        ></input>
        <button type="button" onClick={addrequirement}>
          Add
        </button>

        {requirementlist.map((req, index) => (
          <li key={index} className="text-pink-300 flex gap-5 items-center mt-3">
            <span className='bg-white text-black rounded-md px-2 py-2'>{req}</span>
            <button type="button" onClick={() => removerequirement(index)}>
              Remove
            </button>
          </li>
        ))}
      </div>
    );
  
}

export default Requirementlist;
