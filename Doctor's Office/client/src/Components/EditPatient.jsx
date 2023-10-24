import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios'
const EditPatient = (props) => {
    const { patientId } = useParams()


    const [patient, setPatient] = useState({
        name: "",
        CIN: "",
        age: "",
        phone: ""
    });
    const navigate = useNavigate();
    console.log(patient);
    console.log(patientId);
    const handleChange = (e) => {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value

        });
    };
    useEffect(() => {
        axios.get(`http://localhost:5000/api/Patient/${patientId}`)
            .then(res => {
                console.log(res)
                console.log(patientId);
                setPatient({ name: res.data.name, CIN: res.data.CIN, age: res.data.age, phone: res.data.phone })
            })
            .catch(err => {
                console.log(err)
            })
    }, [patientId])

    const editPatient = () => {
        axios.put(`http://localhost:5000/api/Patient/${patientId}`, patient)
            .then(res => {
                console.log(res.data)
                setPatient(patient)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editPatient()
        navigate('/Dashboard');

    };
    return (
        <div className='fullContainer'>
            <div className="container">
                <h1>Edit Patient</h1>
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
                        {/*<Link to={"/Dashboard"}>   */}
                        <button className="btn btn-primary">
                            Submit
                        </button>
                        {/* </Link> */}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditPatient;
