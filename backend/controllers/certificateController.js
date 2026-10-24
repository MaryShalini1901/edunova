const Certificate = require('../models/Certificate');
const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Get User Certificates
// @route   GET /api/certificates
// @access  Private
const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ user: req.user._id })
      .populate('course');
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify Certificate
// @route   GET /api/certificates/verify/:number
// @access  Public
const verifyCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ 
      certificateNumber: req.params.number 
    }).populate('user').populate('course');

    if (certificate) {
      res.json({
        isValid: certificate.isVerified,
        certificate
      });
    } else {
      res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Generate Certificate
// @route   POST /api/certificates
// @access  Private
const generateCertificate = async (req, res) => {
  try {
    const { courseId } = req.body;
    
    const existingCertificate = await Certificate.findOne({
      user: req.user._id,
      course: courseId
    });

    if (existingCertificate) {
      return res.status(400).json({ message: 'Certificate already exists' });
    }

    const certificate = await Certificate.create({
      user: req.user._id,
      course: courseId
    });

    // Add to user's completed courses
    const user = await User.findById(req.user._id);
    if (!user.completedCourses.includes(courseId)) {
      user.completedCourses.push(courseId);
      await user.save();
    }

    res.status(201).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCertificates, verifyCertificate, generateCertificate };
