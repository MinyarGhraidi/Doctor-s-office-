import React, { useState } from 'react';
import {useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
function AddPatient() {
  const [patient, setPatient] = useState({
    name:"",
    CIN:"",
    age:"",
    phone:""
  });
    const navigate = useNavigate();
console.log(patient);
  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
    .post(`http://localhost:5000/api/Patient`,patient)
    .then((res) => {
      console.log(res.data)
      navigate('/Dashboard');
    })
    .catch((err) => console.log(err));
    
  };

  return (
    <div className='fullContainer'>
    <div className="container">
      <h1>Add Patient</h1>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <Link to="/Dashboard"> Back to Dashboard 🏡</Link> 
      <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
             value={patient.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="CIN">CIN:</label>
          <input
            type="text"
            className="form-control"
            id="CIN"
            name="CIN"
            onChange={handleChange}
            value={patient.CIN}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            className="form-control"
            id="age"
            name="age"
             value={patient.age}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            onChange={handleChange}
             value={patient.phone}
          />
        </div> 
        <button className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default AddPatient;
