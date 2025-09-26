import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios'; 
import TicketForm from './TicketForm.jsx';
import TicketList from './TicketList.jsx';
import FilterSort from './FilterSort.jsx';

// Backend API ka base URL
const API_URL = import.meta.env.VITE_API_URL

function App() {
  
  const [tickets, setTickets] = useState([]); 
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  
  const fetchTickets = async () => {
    try {
      const response = await axios.get(API_URL);
      setTickets(response.data); 
    } catch (error) {
      console.error("Tickets fetch karne mein error:", error);
    }
  };

  
  useEffect(() => {
    fetchTickets();
  }, []); 

  
  const handleAddTicket = async (ticketData) => {
    try {
      await axios.post(API_URL, ticketData);
      fetchTickets(); 
    } catch (error)
    {
      console.error("Ticket banane mein error:", error);
    }
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    const originalTickets = [...tickets];
    const updatedTickets = tickets.map(ticket =>
      ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
    );
    setTickets(updatedTickets);

    try {
      await axios.patch(`${API_URL}${ticketId}`, { status: newStatus });
    } catch (error) {
      console.error("Ticket status update karne mein error:", error);
      setTickets(originalTickets);
    }
  };

  const filteredAndSortedTickets = useMemo(() => {
    let processedTickets = [...tickets];

    if (statusFilter !== 'All') {
      processedTickets = processedTickets.filter(t => t.status === statusFilter);
    }
    if (priorityFilter !== 'All') {
      processedTickets = processedTickets.filter(t => t.priority === priorityFilter);
    }

    processedTickets.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return processedTickets;
  }, [tickets, statusFilter, priorityFilter, sortOrder]);


  return (
    <div className="bg-slate-900 text-white min-h-screen font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400">Mini Helpdesk</h1>
          <p className="text-slate-400 mt-2">One platform for all of your issues.</p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TicketForm onAddTicket={handleAddTicket} />
          </div>

          <div className="lg:col-span-2 bg-slate-800 p-6 rounded-lg shadow-lg">
             <FilterSort
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
            <div className="mt-6">
              <TicketList 
                tickets={filteredAndSortedTickets}
                onStatusChange={handleStatusChange} 
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;


