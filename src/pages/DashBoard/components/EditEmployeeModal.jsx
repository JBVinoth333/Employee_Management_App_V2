import { useState } from 'react';

function EditEmployeeModal({ employee, departments, jobs, onClose, onSave }) {
  const [form, setForm] = useState({ ...employee });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      employeeId: form.employeeId,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      phone2: form.phone2,
      gender: form.gender,
      address: form.address,
      status: form.status,
      departmentId: Number(form.departmentId),
      jobId: Number(form.jobId),
      salary: Number(form.salary),
      pan: form.pan,
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Employee</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="edit-grid">
              <div>
                <label>First Name</label>
                <input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} required />
              </div>
              <div>
                <label>Last Name</label>
                <input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} required />
              </div>
              <div>
                <label>Email</label>
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />
              </div>
              <div>
                <label>Phone</label>
                <input value={form.phone || ''} onChange={(e) => update('phone', e.target.value)} />
              </div>
              <div>
                <label>Alternate Phone</label>
                <input value={form.phone2 || ''} onChange={(e) => update('phone2', e.target.value)} />
              </div>
              <div>
                <label>Gender</label>
                <select value={form.gender || 'Male'} onChange={(e) => update('gender', e.target.value)}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label>Address</label>
                <input value={form.address || ''} onChange={(e) => update('address', e.target.value)} />
              </div>
              <div>
                <label>Status</label>
                <select value={form.status || 'Active'} onChange={(e) => update('status', e.target.value)}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Terminated">Terminated</option>
                </select>
              </div>
              <div>
                <label>Department</label>
                <select value={form.departmentId} onChange={(e) => update('departmentId', e.target.value)}>
                  {departments.map((d) => (
                    <option key={d.departmentId} value={d.departmentId}>{d.departmentName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Job</label>
                <select value={form.jobId} onChange={(e) => update('jobId', e.target.value)}>
                  {jobs.map((j) => (
                    <option key={j.jobId} value={j.jobId}>{j.jobTitle}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Salary</label>
                <input type="number" value={form.salary} onChange={(e) => update('salary', e.target.value)} />
              </div>
              <div>
                <label>PAN</label>
                <input value={form.pan || ''} onChange={(e) => update('pan', e.target.value)} />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployeeModal;
