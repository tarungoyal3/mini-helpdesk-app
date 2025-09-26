const express = require('express');
const router = express.Router();
const { 
  getTickets, 
  createTicket, 
  updateTicketStatus 
} = require('../controllers/ticketController');

router.route('/').get(getTickets).post(createTicket);
router.route('/:id').patch(updateTicketStatus);
module.exports = router;

