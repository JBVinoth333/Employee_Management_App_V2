function JobPostingTable({ postings, jobs, departments, onViewApplications }) {
  function getJobTitle(jobId) {
    const job = jobs.find((j) => j.jobId === jobId);
    return job ? job.jobTitle : `Job #${jobId}`;
  }

  function getDeptName(departmentId) {
    const dept = departments.find((d) => d.departmentId === departmentId);
    return dept ? dept.departmentName : `Dept #${departmentId}`;
  }

  if (!postings || postings.length === 0) {
    return <p className="table-message">No job postings yet.</p>;
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Job</th>
          <th>Department</th>
          <th>Posted</th>
          <th>Closes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {postings.map((p) => (
          <tr key={p.postingId}>
            <td>{p.postingId}</td>
            <td>{p.jobTitle || getJobTitle(p.jobId)}</td>
            <td>{p.departmentName || getDeptName(p.departmentId)}</td>
            <td>{p.postingDate ? p.postingDate.split('T')[0] : '—'}</td>
            <td>{p.closingDate ? p.closingDate.split('T')[0] : '—'}</td>
            <td>
              <button className="action-btn" onClick={() => onViewApplications(p)}>
                View Applications
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default JobPostingTable;
