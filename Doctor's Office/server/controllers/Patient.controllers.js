const Patient = require("../models/Patient.models")






//!-------CRUD

// READ ALL
module.exports.findALLPatient= (req, res) => {
    Patient.find()
        .then(allPatient => {
            res.json(allPatient)
        })
        .catch(err => res.json(err))
}

// CREATE

module.exports.makePatient = (req, res) => {
    Patient.create(req.body)
        .then(newPatient => {
            res.status(200).json(newPatient)
        })
        .catch(err => res.status(400).json(err))
}


// Find One

module.exports.findOnePatient= (req, res) => {

    Patient.findById({_id:req.params.id})
        .then(onePatient => res.status(200).json(onePatient)
        ).catch(err => { res.status(400).json(err) })
}

// Update
module.exports.updateOnePatient = (req, res) => {
    Patient.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedPatient=> { res.json(updatedPatient) })
        .catch(err => { res.json(err) })
}
// Delete

module.exports.deletePatient= (req, res) => {
    Patient.findByIdAndDelete(req.params.id)
        .then(result => { res.json(result) })
        .catch(err => { res.json(err) })


}

// Appointment
module.exports.updatePatientAppointment = (req, res) => {
    Patient.findByIdAndUpdate(
        req.params.id,
        { $push: { appointments: req.body } },
        { new: true, runValidators: true }
    )
        .then(updatedPatient=> { res.json(updatedPatient) })
        .catch(err => { res.json(err) })
}