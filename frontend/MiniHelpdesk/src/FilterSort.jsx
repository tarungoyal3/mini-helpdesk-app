import React from 'react';

function FilterSort({ statusFilter, setStatusFilter, priorityFilter, setPriorityFilter, sortOrder, setSortOrder }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      {/* Status Filter */}
      <div className="flex-1">
        <label htmlFor="statusFilter" className="block text-sm font-medium text-slate-300 mb-1">Filter by Status</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
        >
          <option value="All">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Priority Filter */}
      <div className="flex-1">
        <label htmlFor="priorityFilter" className="block text-sm font-medium text-slate-300 mb-1">Filter by Priority</label>
        <select
          id="priorityFilter"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Sort Order */}
      <div className="flex-1">
        <label htmlFor="sortOrder" className="block text-sm font-medium text-slate-300 mb-1">Sort by</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSort;

