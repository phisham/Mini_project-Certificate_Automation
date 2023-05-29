router.post('/apply', async (req, res) => {
    try {
        const { name, admissionNo, scholarshipName, certificateType, photo, department, class: studentClass, semester } = req.body;

        // Validate the data
        // 

        const application = await CertificateApplication.create({
            name,
            admissionNo,
            scholarshipName,
            certificateType,
            photo,
            department,
            class: studentClass,
            semester,
            status: 'pending',
            // ...
        });

        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
});
