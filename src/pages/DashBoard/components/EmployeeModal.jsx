function EmployeeModal({ employee, departments, jobs, onClose, onEdit, onDelete }) {
  function getDeptName(id) {
    const d = departments.find((d) => d.departmentId === id);
    return d ? d.departmentName : id;
  }

  function getJobTitle(id) {
    const j = jobs.find((j) => j.jobId === id);
    return j ? j.jobTitle : id;
  }

  function getStatusClass(status) {
    if (status === 'Active') {
      return 'status-badge active';
    }
    if (status === 'Terminated') {
      return 'status-badge terminated';
    }
    return 'status-badge inactive';
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{employee.firstName} {employee.lastName}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="detail-grid">
            <div className="detail-item"><span className="detail-label">Employee ID</span><span>{employee.employeeId}</span></div>
            <div className="detail-item"><span className="detail-label">Email</span><span>{employee.email}</span></div>
            <div className="detail-item"><span className="detail-label">Phone</span><span>{employee.phone}</span></div>
            <div className="detail-item"><span className="detail-label">Alternate Phone</span><span>{employee.phone2 || '-'}</span></div>
            <div className="detail-item"><span className="detail-label">Gender</span><span>{employee.gender}</span></div>
            <div className="detail-item"><span className="detail-label">Date of Birth</span><span>{employee.dateOfBirth}</span></div>
            <div className="detail-item"><span className="detail-label">Address</span><span>{employee.address}</span></div>
            <div className="detail-item"><span className="detail-label">Hire Date</span><span>{employee.hireDate}</span></div>
            <div className="detail-item"><span className="detail-label">Department</span><span>{getDeptName(employee.departmentId)}</span></div>
            <div className="detail-item"><span className="detail-label">Job</span><span>{getJobTitle(employee.jobId)}</span></div>
            <div className="detail-item"><span className="detail-label">Salary</span><span>{employee.salary}</span></div>
            <div className="detail-item"><span className="detail-label">PAN</span><span>{employee.pan}</span></div>
            <div className="detail-item"><span className="detail-label">Status</span><span><span className={getStatusClass(employee.status)}>{employee.status || 'Unknown'}</span></span></div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="edit-btn" onClick={() => { onClose(); onEdit(employee); }}>Edit Employee</button>
          <button className="delete-btn" onClick={() => onDelete(employee.employeeId)}>Delete Employee</button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeModal;
