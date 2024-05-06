import React from 'react';
import { useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Student() {
  const  [students, setStudents] = useState([]);

  useEffect(()=> { // use to fetch data from the server when component is mounted 
    axios.get('http://localhost:8081/')
      .then(res=> setStudents(res.data) )
      .catch(err=> console.log(err))
  }, []) 
// Empty array so it runs once on mount

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/user/${id}`);
      window.location.reload()
    }catch (err) {
      console.log(err);
    }
  } 

  return (
    <div className='d-flex vh-10 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded'>
        <Link to="/create"  className='btn btn-success'>Ajouter</Link>
        <table className='table'>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            { students.map((data, i)=>(
              <tr key={i}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>
                  <Link to={`update/${data.id}`}className='btn btn-primary m-2'>Modifier</Link>
                  <button className='btn btn-danger m-2' onClick={e => handleDelete(data.id)}>Supprimer</button>
                </td>
  
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Student