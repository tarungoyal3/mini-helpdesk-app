import React, { useState } from 'react';

export default function TicketForm({ onAddTicket }) {
  const [name, setName] = useState('');
  const [issue, setIssue] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !issue.trim()) {
      setError('Name and Issue descriptions are required.');
      return;
    }

    const newTicket = {
      id: Date.now(), // Using timestamp for a unique ID in this mock setup
      name,
      issue,
      priority,
      status: 'Open',
      createdAt: new Date().toISOString(),
    };

    onAddTicket(newTicket);

    // Reset form
    setName('');
    setIssue('');
    setPriority('Medium');
    setError('');
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-slate-700 dark:text-slate-200">Submit a New Ticket</h2>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">{error}</div>}
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="e.g., Jane Doe"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="issue" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
            Describe the Issue
          </label>
          <textarea
            id="issue"
            rows="4"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="My computer is making a weird noise..."
          ></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="priority" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 transition-colors duration-200"
        >
          Submit Ticket
        </button>
      </form>
    </div>
  );
}
