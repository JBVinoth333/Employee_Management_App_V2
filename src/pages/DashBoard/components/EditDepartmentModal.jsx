import { useState } from 'react';

function EditDepartmentModal({ department, onClose, onSave }) {
  const [form, setForm] = useState({ ...department });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      departmentId: form.departmentId,
      departmentName: form.departmentName,
      description: form.description,
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Department</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="edit-grid">
              <div>
                <label>Department Name</label>
                <input value={form.departmentName} onChange={(e) => update('departmentName', e.target.value)} required />
              </div>
              <div>
                <label>Description</label>
                <input value={form.description || ''} onChange={(e) => update('description', e.target.value)} />
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

export default EditDepartmentModal;
