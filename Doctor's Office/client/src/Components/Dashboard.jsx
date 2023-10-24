import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'
const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const location = useLocation();
  console.log("PATIENTS------", patients);
  useEffect(() => {
    axios.get("http://localhost:5000/api/Patient")
        .then(res => {
            console.log(res.data)
            setPatients(res.data)
        })
        .catch(err => {
            console.log(err)
        })
}, [])
  const removePatient = (patientId) => {
    axios.delete(`http://localhost:5000/api/Patient/${patientId}`)
    //1:filter 
    const filteredPatient = patients.filter((eachPatient) => {
        if (eachPatient._id == patientId) {
            return false
        } else {
            return true

        }
    })
    setPatients(filteredPatient)
   
  };
  const editPatient = (patientId, patientData) => {

    axios.put(`http://localhost:5000/api/Patient/${patientId}`, patientData)
      .then(res => {
        console.log(res.data)
        setPatients(patients)
      })
      .catch(err => {
        console.log(err)
      })
      
    };
  const transformDate = (date) =>{
      return new Date(date).toLocaleString()
  }

  return (
    <div className='fullContainer'>
    <div className="container">
      <h1>Patient Management</h1>
      <p>Manage your patients here!</p>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className={`nav-item ${location.pathname === '/Dashboard' ? 'active' : ''}`}>
                <Link className="nav-link" to="/Dashboard">Dashboard</Link>
              </li>
              <li className={`nav-item ${location.pathname === '/AppointmentManagement' ? 'active' : ''}`}>
                <Link className="nav-link" to="/AppointmentManagement">Appointment Management</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>CIN</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Appointment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td>{patient.name}</td>
              <td>{patient.CIN}</td>
              <td>{patient.age}</td>
              <td>{patient.phone}</td>
              <td className='d-flex flex-column'>
                {/*patient.appointments? new Date(patient.appointment).toLocaleDateString():""*/}
                {patient.appointments.map((a,i)=>
                <span key={i}>{transformDate(a.date)}</span>
                )}
                </td>
              <td>
              <Link to={`/EditPatient/${patient._id}`}>  <button
                  className="btn btn-success mr-2"
                 
                >
                  Edit
                </button></Link>
                <button
                  className="btn btn-danger"
                  onClick={() => removePatient(patient._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/AddPatient">
        <button className="btn btn-primary" type="submit">
          Add Patient
        </button>
      </Link>
    </div>
    
    </div>

  );
};

export default Dashboard;
