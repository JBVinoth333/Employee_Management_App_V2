function JobTable({ jobs, onEdit }) {
  if (jobs.length === 0) return <p>No jobs yet.</p>;

  return (
    <div className="table-wrapper">
      <table className="job-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Min Salary</th>
            <th>Max Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.jobId}>
              <td>{job.jobId}</td>
              <td>{job.jobTitle}</td>
              <td>{job.jobDescription}</td>
              <td>{job.minSalary}</td>
              <td>{job.maxSalary}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(job)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobTable;
