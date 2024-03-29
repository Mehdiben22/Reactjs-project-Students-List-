import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {FaEdit, FaEye, FaTrashAlt} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Search from '../common/Search';

const StudentsView = () => {

    const [students , setStudents] = useState([]);
    const [search, setSearch] = useState("");
    
    useEffect(() => {
        loadStudents();
    },[]);
     
    const loadStudents = async() => {
        const result = await axios.get("http://localhost:9193/students",{
            validateStatus : () =>{
                return true;
            },
        });
        if(result.status === 302) {
            setStudents(result.data);
        }
    }

    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:9193/students/delete/${id}`);
        loadStudents();
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'étudiant :', error);
    }
    };

  return (
    <section>
      <Search search={search}
      setSearch={setSearch}/>
      <table className='table table-bordered table-hover'>
        <thead>
            <tr className='text-center'>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department</th>
              <th colSpan='3'>Actions</th>
            </tr>
        </thead>
        <tbody className='text-center'>
          {/* filtering for search after that we map it */}
            {students.filter((st) => 
             st.firstname.toLowerCase().includes(search)
            )
            .map((student, index) => (
                 <tr key={student.id}>
                    <th scope='row' key={index}>
                        {index + 1}
                    </th>
                 <td>{student.firstname}</td>
                 <td>{student.lastname}</td>
                 <td>{student.email}</td>
                 <td>{student.department}</td>
                 <td className='mx-2'>
                    <Link to={`/student-profile/${student.id}`} className='btn btn-info'>
                    <FaEye/>
                    </Link>
                    </td>
                 <td className='mx-2'>
                     <Link to={`/edit-student/${student.id}`} className='btn btn-warning'>
                    <FaEdit/>
                    </Link>
                    </td>
                 <td className='mx-2'>

                 <button className='btn btn-danger'
                         onClick={()=> handleDelete(student.id)}             
                  >
                    <FaTrashAlt/>
                    </button>

                 </td>
                 </tr>
            ) )}
           
        </tbody>
      </table>
    </section>
  )
}

export default StudentsView
