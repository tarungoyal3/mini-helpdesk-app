import React from 'react';
const formatDateTime = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

const getStatusColor = (status) => {
  switch (status) {
    case 'Open':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'Closed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
  }
};

const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'Low':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };


export default function TicketList({ tickets, onStatusChange  }) {
  if (tickets.length === 0) {
    return (
        <div className="text-center py-10 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">No Tickets Found</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Try adjusting your filters or submitting a new ticket.</p>
        </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-slate-700 dark:text-slate-200">Ticket Dashboard</h2>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket._id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 transition-shadow hover:shadow-lg">
            <div className="flex flex-col md:flex-row justify-between md:items-start">
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex items-center mb-2">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)} mr-3`}>
                        {ticket.priority}
                    </span>
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{ticket.name}</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-300 ml-1">{ticket.issue}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 ml-1">
                  Created: {formatDateTime(ticket.createdAt)}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                  {ticket.status}
                </span>
                <div>
                  <label htmlFor={`status-update-${ticket.id}`} className="sr-only">Update Status</label>
                  <select
                    id={`status-update-${ticket._id}`}
                    value={ticket.status}
                    onChange={(e) => onStatusChange(ticket._id, e.target.value)}
                    className="bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
