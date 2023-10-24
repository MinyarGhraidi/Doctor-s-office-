import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the datepicker styles
import 'react-time-picker/dist/TimePicker.css'; // Import the time picker styles
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AppointmentManagement() {
  const [patients, setPatients] = useState([]);
  const [appointment, setAppointment] = useState({
    patient_id: "",
    date: new Date(), // Initialize the date and time with the current date and time
    comment: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/Patient')
      .then(res => {
        setPatients(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (e) => {
    setAppointment({
      ...appointment,
      date: e,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointBody = {
      date: appointment.date,
      comment: appointment.comment,
    };
    if (appointment.patient_id !== "") {

      axios
        .put(`http://localhost:5000/api/Patient/appointment/${appointment.patient_id}`, appointBody)
        .then((res) => {
          console.log(res.data);
          navigate('/Dashboard');
        })
        .catch((err) => console.log(err));
    } else return <span className='text-danger'>Please select a patient</span>;
  };

  return (
    <div className='fullContainer'>
    <div className="container mt-5">
      <div className="row">
        <h2>Appointment Management</h2>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Link to="/Dashboard"> Back to Dashboard 🏡</Link>
        <div>
         <div className="col-md-6">
          <form onSubmit={handleSubmit} className="appointment-form">
            <div className="mb-3">
              <label htmlFor="patient_id" className="form-label">
                Select a patient:
              </label>
              <select
                name="patient_id"
                onChange={handleChange}
                className="form-select"
                value={appointment.patient_id}
              >
                <option value="" disabled>Select Patient</option>
                {patients.map((p, i) => (
                  <option key={i} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Select a date:
              </label>
              <DatePicker
                name="date"
                selected={appointment.date}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="dd/MM/yyyy HH:mm"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="comment" className="form-label">
                Comment:
              </label>
              <textarea
                className="form-control"
                id="comment"
                name="comment"
                onChange={handleChange}
              />
            </div>
          
            <button type="submit" className="btn btn-primary">
              Add Appointment
            </button>
          </form>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default AppointmentManagement;
