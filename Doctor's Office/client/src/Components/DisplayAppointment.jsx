import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DisplayAppointment() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/Patient")
      .then((res) => {
        console.log(res.data);
        setAppointments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1>Appointment List</h1>
      <Link to="/">Back to Dashboard 🏡</Link>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Date and Time</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.name}</td>
              <td>{appointment.dateTime}</td>
              <td>{appointment.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayAppointment;
