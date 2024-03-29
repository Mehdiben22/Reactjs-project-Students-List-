import React , { useState , useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const EditStudent = () => {

    const {id} = useParams();
 //initialize as empty object for adding 
 const [student , setStudent] = useState({
    firstname : '',
    lastname : '',
    email : '',
    department :''
});

const navigate =  useNavigate(); 
const {firstname, lastname, email, department} = student;

useEffect(() => {
    loadStudent();
},[]);
 
const loadStudent = async() => {
    const result = await axios.get(`http://localhost:9193/students/student/${id}`);
    
        setStudent(result.data);
}

const handleInputChange = (e) => {
    setStudent({...student, [e.target.name] : e.target.value })
};

const editStudent = async(e) => {
    e.preventDefault();
    await axios.put(`http://localhost:9193/students/update/${id}` , student);
    navigate('/view-students');
};



return (
<div className='col-sm-8 py-2 px-5 offset-2 shadow'>
    <form onSubmit={(e)=> editStudent(e)}>
       <div className='input-group mb-5'>
        <label className='input-group-text'
               htmlFor='firstname' 
        >
            First Name :
        </label>
        <input className='form-control col-sm-6'
               type='text'
               name='firstname'
               id='firstname'
               required
               value={firstname}
               onChange={(e) => handleInputChange(e)}
               />
       </div>
       <div className='input-group mb-5'>
        <label className='input-group-text'
               htmlFor='lastname' 
        >
            Last Name :
        </label>
        <input className='form-control col-sm-6'
               type='text'
               name='lastname'
               id='lastname'
               required
               value={lastname}
               onChange={(e) => handleInputChange(e)}
               />
       </div>
       <div className='input-group mb-5'>
        <label className='input-group-text'
               htmlFor='email' 
        >
            Your Email :
        </label>
        <input className='form-control col-sm-6'
               type='text'
               name='email'
               id='email'
               required
               value={email}
               onChange={(e) => handleInputChange(e)}
               />
       </div>
       <div className='input-group mb-5'>
        <label className='input-group-text'
               htmlFor='department' 
        >
            Department :
        </label>
        <input className='form-control col-sm-6'
               type='text'
               name='department'
               id='department'
               required
               value={department}
               onChange={(e) => handleInputChange(e)}
               />
       </div>
       <div className="row mb-5">
                <div className="col-sm-9">
                    <button
                        type="submit"
                        className="btn btn-outline-success btn-lg">
                        Save
                    </button>
                </div>

                <div className="col-sm-2">
                    <Link
                        to={"/view-students"}
                        type="submit"
                        className="btn btn-outline-warning btn-lg">
                        Cancel
                    </Link>
                </div>
            </div>
        </form>
    </div>
);
};

export default EditStudent
