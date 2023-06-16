const mongoose = require("mongoose");
const { Student } = require("./UsersModel");

const certificateApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admissionNo: {
        type: Number,
        required: true
    },
    scholarshipName: {
        type: String,
        required: true
    },
    certificateType: {
        type: [String],
    },
    photo: {
        type: String,
    },
    department: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    class: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    to: {
        type: mongoose.Types.ObjectId,
    }, 
    studentId: {
        type: mongoose.Types.ObjectId,
        ref: Student
    },
    remarks: {
        type: String
    }
});

const CertificateApplication = mongoose.model('CertificateApplication', certificateApplicationSchema);

module.exports = { CertificateApplication };