const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    admissionNo: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true,
    },
    batch: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: "data:image/jpeg;base64,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"
    },
    address: {
        type: String,
    },
    annualIncome: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    staffAdvisor: {
        type: String
    },
    department: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    }
});



const facultySchema = new mongoose.Schema({
    employeeNo: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "data:image/jpeg;base64,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"
    },
    dateOfJoining: {
        type: Date,
        required: true
    },
});


const deanSchema = new mongoose.Schema({
    employeeNo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "data:image/jpeg;base64,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"
    },
    dateOfJoining: {
        type: Date,
        required: true
    },
})

const Student = mongoose.model("student", studentSchema);
const Faculty = mongoose.model("faculty", facultySchema);
const Dean = mongoose.model("dean", deanSchema);

module.exports = { Student, Faculty, Dean };
