const express = require('express');
const router = express.Router();
const { CertificateApplication } = require('../Modals/UsersModel');
const { Student, Faculty, Dean, Principal } = require('../Modals/UsersModel'); 

router.post('/apply', async (req, res) => {
    try {
        // const { name, admissionNo, scholarshipName, certificateType, photo, department, semester } = req.body;

        // Validate the data
        // 

        const application = await CertificateApplication.create(req.body);

        res.status(201).json({ message: 'Application submitted successfully',data:application });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});

router.patch('/forwardApplication', async(req, res) => {
    const userType = req.params.userType;
    let User;

    switch(userType){
        case 'Student':{
            User = Student;
            break;
        }
        case 'Faculty':{
            User = Faculty;
            break;
        }
        case 'Dean':{
            User = Dean;
            break;
        }
        case 'Principal':{
            User = Principal;
            break;
        }
    }
    let certificate = await CertificateApplication.findOne({ admissionNo: admissionNo });

    if(certificate.to === req.user.id){
        const certificate = await CertificateApplication.findOne({ admissionNo: admissionNo });
    }

    try {
        const userType = req.params.userType;
        let User;

        switch(userType){
            case 'Student':{
                User = Student;
                const to = User.staffAdvisorAssigned;
                const certificate = await CertificateApplication.findOneAndUpdate ({ 
                    admissionNo: admissionNo,
                    to: to
                });

                res.status(201).json({
                    message: 'Application forwarded to Staff Advisor', 
                    data: certificate 
                });
                break;
            }
            case 'Faculty':{
                User = Faculty;
                let to = User.hodAssigned;
                if(to === NULL){
                    // User = HOD
                    to = User.deanAssigned;
                    const certificate = await CertificateApplication.findOneAndUpdate ({ 
                        admissionNo: admissionNo,
                        to: to
                    });

                    res.status(201).json({ 
                        message: 'Application forwarded to Dean', 
                        data: certificate 
                    });
                }
                else{
                    // User = Staff Advisor
                    const certificate = await CertificateApplication.findOneAndUpdate ({ 
                        admissionNo: admissionNo,
                        to: to
                    });

                    res.status(201).json({ 
                        message: 'Application forwarded to HOD', 
                        data: certificate 
                    });
                }
                break;
            }
            case 'Dean':{
                User = Dean;
                const certificate = await CertificateApplication.findOneAndUpdate ({ 
                    admissionNo: admissionNo,
                    to: from
                });

                res.status(201).json({ 
                    message: 'Application approved by Dean', 
                    data: certificate 
                });
                break;
            }
        }
    } catch (error) {
        res.status.json({ message: "Error: Couldn't forawrd Certificate Application" })
    }
})