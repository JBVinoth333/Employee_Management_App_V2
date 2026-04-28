import { useState } from 'react';

function AddJobForm({ onAdd }) {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [minSalary, setMinSalary] = useState('0');
  const [maxSalary, setMaxSalary] = useState('0');

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({
      jobTitle: jobTitle.trim(),
      jobDescription: jobDescription.trim(),
      minSalary: Number(minSalary),
      maxSalary: Number(maxSalary),
    });
    setJobTitle('');
    setJobDescription('');
    setMinSalary('0');
    setMaxSalary('0');
  }

  return (
    <form className="add-job-form" onSubmit={handleSubmit}>
      <h2>Add Job</h2>
      <div className="grid">
        <div>
          <label>Job Title</label>
          <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <input type="text" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
        </div>
        <div>
          <label>Min Salary</label>
          <input type="number" min="0" step="0.01" value={minSalary} onChange={(e) => setMinSalary(e.target.value)} required />
        </div>
        <div>
          <label>Max Salary</label>
          <input type="number" min="0" step="0.01" value={maxSalary} onChange={(e) => setMaxSalary(e.target.value)} required />
        </div>
      </div>
      <button type="submit">Add Job</button>
    </form>
  );
}

export default AddJobForm;
