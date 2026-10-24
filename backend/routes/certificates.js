const express = require('express');
const router = express.Router();
const { getCertificates, verifyCertificate, generateCertificate } = require('../controllers/certificateController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getCertificates);
router.get('/verify/:number', verifyCertificate);
router.post('/', protect, generateCertificate);

module.exports = router;
