import { useState } from 'react';

function EditJobModal({ job, onClose, onSave }) {
  const [form, setForm] = useState({ ...job });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      jobId: form.jobId,
      jobTitle: form.jobTitle.trim(),
      jobDescription: (form.jobDescription || '').trim(),
      minSalary: Number(form.minSalary),
      maxSalary: Number(form.maxSalary),
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Job</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="edit-grid">
              <div>
                <label>Job Title</label>
                <input value={form.jobTitle || ''} onChange={(e) => update('jobTitle', e.target.value)} required />
              </div>
              <div>
                <label>Description</label>
                <input value={form.jobDescription || ''} onChange={(e) => update('jobDescription', e.target.value)} />
              </div>
              <div>
                <label>Min Salary</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.minSalary}
                  onChange={(e) => update('minSalary', e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Max Salary</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.maxSalary}
                  onChange={(e) => update('maxSalary', e.target.value)}
                  required
                />
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

export default EditJobModal;