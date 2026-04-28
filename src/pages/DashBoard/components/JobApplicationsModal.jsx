import { useState, useEffect } from 'react';
import AcceptApplicationModal from './AcceptApplicationModal';
import { apiFetch } from '../../../api';

const API = '/api';

function statusBadge(status) {
  const colorMap = { Pending: '#f59e0b', Accepted: '#22c55e', Rejected: '#ef4444' };
  return (
    <span style={{
      display: 'inline-block',
      padding: '0.2rem 0.6rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: 600,
      background: colorMap[status] || '#6b7280',
      color: '#fff',
    }}>
      {status}
    </span>
  );
}

function JobApplicationsModal({ posting, jobs, departments, onClose, onApplicationUpdated }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [acceptingApp, setAcceptingApp] = useState(null);
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    loadApplications();
  }, [posting.postingId]);

  function loadApplications() {
    setLoading(true);
    setError('');
    apiFetch(`${API}/jobapplications?postingId=${posting.postingId}`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setApplications(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setError('Failed to load applications');
        setApplications([]);
      })
      .finally(() => setLoading(false));
  }

  async function handleReject(applicationId) {
    if (!window.confirm('Reject this application?')) return;
    setActionMsg('');
    try {
      const res = await apiFetch(`${API}/jobapplications`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ applicationId, action: 'reject' }),
      });
      const data = await res.json();
      if (res.ok) {
        setActionMsg('Application rejected.');
        loadApplications();
        if (onApplicationUpdated) onApplicationUpdated();
      } else {
        setActionMsg(data.message || 'Failed to reject');
      }
    } catch {
      setActionMsg('Network error.');
    }
  }

  async function handleAccept(payload) {
    setActionMsg('');
    try {
      const res = await apiFetch(`${API}/jobapplications`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setAcceptingApp(null);
        setActionMsg('Application accepted and employee added!');
        loadApplications();
        if (onApplicationUpdated) onApplicationUpdated();
      } else {
        setActionMsg(data.message || 'Failed to accept');
      }
    } catch {
      setActionMsg('Network error.');
    }
  }

  const job = jobs.find((j) => j.jobId === posting.jobId);
  const dept = departments.find((d) => d.departmentId === posting.departmentId);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box modal-wide" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        <h2>Applications for Posting #{posting.postingId}</h2>
        <p className="modal-sub">
          {job ? job.jobTitle : `Job #${posting.jobId}`} &mdash;{' '}
          {dept ? dept.departmentName : `Dept #${posting.departmentId}`}
        </p>

        {actionMsg && (
          <p style={{ fontSize: '0.85rem', color: 'var(--text)', marginBottom: '0.5rem' }}>{actionMsg}</p>
        )}

        {loading && <p className="table-message">Loading applications...</p>}
        {error && <p className="table-message error">{error}</p>}

        {!loading && !error && applications.length === 0 && (
          <p className="table-message">No applications received yet.</p>
        )}

        {!loading && applications.length > 0 && (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>DOB</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.applicationId}>
                  <td>{app.applicantName}</td>
                  <td>{app.dateOfBirth || '—'}</td>
                  <td>{app.applicantEmail}</td>
                  <td>{app.applicantPhone || '—'}</td>
                  <td>{statusBadge(app.status)}</td>
                  <td>
                    {app.status === 'Pending' && (
                      <>
                        <button
                          className="action-btn"
                          style={{ marginRight: '0.4rem' }}
                          onClick={() => setAcceptingApp(app)}
                        >
                          Accept
                        </button>
                        <button
                          className="action-btn action-btn--danger"
                          onClick={() => handleReject(app.applicationId)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {app.status !== 'Pending' && <span style={{ fontSize: '0.8rem', color: 'var(--text)' }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {acceptingApp && (
        <AcceptApplicationModal
          application={acceptingApp}
          posting={posting}
          jobs={jobs}
          departments={departments}
          onAccept={handleAccept}
          onClose={() => setAcceptingApp(null)}
        />
      )}
    </div>
  );
}

export default JobApplicationsModal;
