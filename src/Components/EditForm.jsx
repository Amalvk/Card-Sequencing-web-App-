import React from 'react';
import './EditForm.css';
import Form from "react-bootstrap/Form";
import { Button } from 'react-bootstrap';
import { useState } from 'react';



function EditForm(props) {

  const [data,setData] = useState('')

  
  return (
    <div  className='edit-card'>
    {props[0].map((item)=>{
      if(props.editCardData.id===item.id)
      return(
        <div className='edit-card-envelope'>
          <Form.Control  value={data} placeholder={item.value} onChange={(e)=>setData(e.target.value)}/>
          <div className='edit-card-button'>
          <Button onClick={()=>{props.inputData(data,true,item.id)}}>Save</Button>
          <Button variant='danger' onClick={()=>{props.doNothing()}}>Cancel</Button>
          </div>
        </div>
        )
      
    })
      
    }
    </div>
  )
}

export default EditForm