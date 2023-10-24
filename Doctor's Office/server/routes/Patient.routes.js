const PatientControllers = require("../controllers/Patient.controllers")

module.exports = (app) => {
    app.get("/api/Patient", PatientControllers.findALLPatient)
    app.post("/api/Patient", PatientControllers.makePatient)
    app.get("/api/Patient/:id", PatientControllers.findOnePatient)
    app.put("/api/Patient/:id", PatientControllers.updateOnePatient)
    app.delete("/api/Patient/:id", PatientControllers.deletePatient)
    app.put("/api/Patient/appointment/:id", PatientControllers.updatePatientAppointment)
}