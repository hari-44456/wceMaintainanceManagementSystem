const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  department: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  workType: {
    type: String,
    required: true,
  },
  otherWork: {
    type: String,
  },
  reasonForRejection: {
    type: String,
  },
  rejected: {
    type: Boolean,
    default: false,
  },
  signOfStudentOrStaff: {
    type: String,
    required: true,
  },
  fund: {
    type: Number,
  },
  HoDSign: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    default: 'Forwarded to HoD',
  },
  stage: {
    type: Number,
    default: 1, // 1->Complaint is at student/staff and corresponding HoD 2-> at AO 3-> at commitee
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Complaint', ComplaintSchema);
