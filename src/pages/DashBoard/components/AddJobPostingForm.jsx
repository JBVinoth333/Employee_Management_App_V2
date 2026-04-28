import { useState } from 'react';

function AddJobPostingForm({ jobs, departments, onAdd }) {
  const [jobId, setJobId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [closingDate, setClosingDate] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ jobId: Number(jobId), departmentId: Number(departmentId), closingDate });
    setJobId('');
    setDepartmentId('');
    setClosingDate('');
  }

  return (
    <form className="add-job-form" onSubmit={handleSubmit}>
      <h2>Create Job Posting</h2>
      <div className="grid">
        <div>
          <label>Job</label>
          <select value={jobId} onChange={(e) => setJobId(e.target.value)} required>
            <option value="">Select a job</option>
            {jobs.map((j) => (
              <option key={j.jobId} value={j.jobId}>{j.jobTitle}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Department</label>
          <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required>
            <option value="">Select a department</option>
            {departments.map((d) => (
              <option key={d.departmentId} value={d.departmentId}>{d.departmentName}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Closing Date</label>
          <input
            type="date"
            value={closingDate}
            onChange={(e) => setClosingDate(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit">Create Posting</button>
    </form>
  );
}

export default AddJobPostingForm;
