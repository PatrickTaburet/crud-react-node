import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStudent() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const navigate= useNavigate()
    const {id} = useParams()
    
    function handleSubmit(event){
        event.preventDefault();
        axios.put(`http://localhost:8081/update/${id}`, {name, email})
        .then(res=>{
            console.log("Update Student", res);
            navigate('/');
        })
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form action="" onSubmit={handleSubmit}>
                <h2>Create Student</h2>
                <div className='mb-2'>
                    <label htmlFor="">Nom</label>
                    <input type="text" placeholder="Enter you're name" className='form-control' onChange={e => setName(e.target.value)}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Enter you're email" className='form-control'  onChange={e => setEmail(e.target.value)}/>
                </div>
                <button className='btn btn-success' >Submit</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateStudent