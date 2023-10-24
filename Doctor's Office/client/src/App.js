
import './App.css';
import Dashboard from './Components/Dashboard';
import AddPatient from './Components/AddPatient';
import AppointmentManagement from './Components/AppointmentManagement';
import LoginRegister from './Components/LoginRegister'
import EditPatient from './Components/EditPatient';
import {Routes , Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">

          <Routes>
          <Route path="/" element={<LoginRegister/>} />
         <Route path="/Dashboard" element={<Dashboard/>} />
         <Route path="/EditPatient/:patientId" element={<EditPatient/>} />
         <Route path="/AddPatient" element={<AddPatient/>} />
         <Route path="/AppointmentManagement" element={<AppointmentManagement/>} />
         </Routes>
    </div>
  );
}

export default App;
