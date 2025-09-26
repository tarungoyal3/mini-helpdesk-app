const asyncHandler = require('express-async-handler');
const Ticket = require('../models/ticketModel');

const getTickets = asyncHandler(async (req, res) => {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.status(200).json(tickets);
});


const createTicket = asyncHandler(async (req, res) => {
    const { name, issue, priority } = req.body;

    if (!name || !issue || !priority) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const ticket = await Ticket.create({
        name,
        issue,
        priority,
        status: 'Open' // Default status
    });

    res.status(201).json(ticket);
});


const updateTicketStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;

    if (!status) {
        res.status(400);
        throw new Error('Status field is required');
    }

    
    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,         
        { status: status },     
        { new: true }           
    );

    if (!updatedTicket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    res.status(200).json(updatedTicket);
});


module.exports = {
    getTickets,
    createTicket,
    updateTicketStatus,
};

