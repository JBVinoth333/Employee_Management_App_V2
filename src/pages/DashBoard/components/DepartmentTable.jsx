import { useState } from 'react';

function DepartmentTable({ departments, employees, deptManagers, onEdit, onAssignManager, onRemoveManager }) {
  const [selectedManagers, setSelectedManagers] = useState({});

  function getEmpName(id) {
    const emp = employees.find((e) => e.employeeId === id);
    return emp ? emp.firstName + ' ' + emp.lastName : '';
  }

  function getDeptManagerId(deptId) {
    const m = deptManagers.find((dm) => dm.departmentId === deptId);
    return m ? m.managerId : null;
  }

  function handleAssign(deptId) {
    const selectedManagerId = selectedManagers[deptId];
    if (!selectedManagerId) return;
    onAssignManager(deptId, Number(selectedManagerId));
    setSelectedManagers((prev) => ({ ...prev, [deptId]: '' }));
  }

  if (departments.length === 0) return <p>No departments yet.</p>;

  return (
    <div className="table-wrapper">
      <table className="dept-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((d) => {
            const mgrId = getDeptManagerId(d.departmentId);
            return (
              <tr key={d.departmentId}>
                <td>{d.departmentId}</td>
                <td>{d.departmentName}</td>
                <td>{d.description || '-'}</td>
                <td>
                  <button className="edit-btn" onClick={() => onEdit(d)}>Edit</button>
                </td>
                <td className="manager-cell">
                  {mgrId ? (
                    <span className="manager-info">
                      {getEmpName(mgrId)}
                      <button className="remove-mgr-btn" onClick={() => onRemoveManager(d.departmentId)} title="Remove manager">&times;</button>
                    </span>
                  ) : (
                    <span className="assign-mgr">
                      <select
                        value={selectedManagers[d.departmentId] || ''}
                        onChange={(e) => setSelectedManagers((prev) => ({ ...prev, [d.departmentId]: e.target.value }))}
                      >
                        <option value="">Select</option>
                        {employees
                          .filter((emp) => !deptManagers.some((dm) => dm.managerId === emp.employeeId))
                          .map((emp) => (
                            <option key={emp.employeeId} value={emp.employeeId}>
                              {emp.firstName} {emp.lastName}
                            </option>
                          ))}
                      </select>
                      <button className="assign-btn" onClick={() => handleAssign(d.departmentId)} disabled={!selectedManagers[d.departmentId]}>Assign</button>
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentTable;
