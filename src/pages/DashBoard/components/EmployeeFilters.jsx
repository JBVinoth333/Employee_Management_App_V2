function EmployeeFilters({ search, status, department, sortBy, sortOrder, departments, onChange }) {
  function handle(patch) {
    onChange({ search, status, department, sortBy, sortOrder, ...patch });
  }

  return (
    <div className="employee-filters">
      <input
        type="search"
        value={search}
        onChange={(e) => handle({ search: e.target.value })}
        placeholder="Search by name, email, phone or ID"
      />
      <select value={status} onChange={(e) => handle({ status: e.target.value })}>
        <option value="all">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        <option value="Terminated">Terminated</option>
      </select>
      <select value={department} onChange={(e) => handle({ department: e.target.value })}>
        <option value="all">All Departments</option>
        {departments.map((dept) => (
          <option key={dept.departmentId} value={dept.departmentId}>
            {dept.departmentName}
          </option>
        ))}
      </select>
      <select value={sortBy} onChange={(e) => handle({ sortBy: e.target.value })}>
        <option value="name">Sort by Name</option>
        <option value="salary">Sort by Salary</option>
        <option value="hireDate">Sort by Hire Date</option>
      </select>
      <select value={sortOrder} onChange={(e) => handle({ sortOrder: e.target.value })}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button
        className="clear-filter-btn"
        type="button"
        onClick={() => onChange({ search: '', status: 'all', department: 'all', sortBy: 'name', sortOrder: 'asc' })}
      >
        Clear
      </button>
    </div>
  );
}

export default EmployeeFilters;
