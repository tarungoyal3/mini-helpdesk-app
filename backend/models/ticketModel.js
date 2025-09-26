const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'], 
  },
  issue: {
    type: String,
    required: [true, 'Please describe the issue'], 
  },
  priority: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High'], 
    default: 'Medium',
  },
  status: {
    type: String,
    required: true,
    enum: ['Open', 'In Progress', 'Closed'], 
    default: 'Open',
  },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('Ticket', ticketSchema);
