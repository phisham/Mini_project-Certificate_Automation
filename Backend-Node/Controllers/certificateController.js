const express=require('express');
const router =express.Router();
const {CertificateApplication}=require('../Modals/certificate');

router.post('/apply', async (req, res) => {
    try {
        // const { name, admissionNo, scholarshipName, certificateType, photo, department, semester } = req.body;

        // Validate the data
        // 

        const application = await CertificateApplication.create(req.body);

        return res.status(201).json({ message: 'Application submitted successfully',data:application });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
    }
});



module.exports = router;