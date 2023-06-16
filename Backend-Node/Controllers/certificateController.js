const express=require('express');
const router =express.Router();
const {CertificateApplication}=require('../Modals/UsersModel');

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