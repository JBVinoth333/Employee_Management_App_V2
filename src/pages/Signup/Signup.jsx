import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../../components/InputField';
import ThemeToggle from '../../components/ThemeToggle';
import { apiFetch } from '../../api';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [workPhone, setWorkPhone] = useState('');
  const [message, setMessage] = useState('');

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyStep, setApplyStep] = useState('list');
  const [postings, setPostings] = useState([]);
  const [postingsLoading, setPostingsLoading] = useState(false);
  const [selectedPosting, setSelectedPosting] = useState(null);
  const [applyName, setApplyName] = useState('');
  const [applyEmail, setApplyEmail] = useState('');
  const [applyPhone, setApplyPhone] = useState('');
  const [applyMsg, setApplyMsg] = useState('');
  const [applySubmitting, setApplySubmitting] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setMessage('');
    try {
      const response = await apiFetch('/api/Signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password, companyName, firstName, lastName, email, workPhone }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        navigate('/login');
      } else {
        setMessage('Something went wrong. Try again.');
      }
    } catch {
      setMessage('Something went wrong. Try again.');
    }
  }

  async function openApplyModal() {
    setShowApplyModal(true);
    setApplyStep('list');
    setApplyMsg('');
    setPostingsLoading(true);
    try {
      const res = await apiFetch('/api/public/jobpostings');
      const data = await res.json();
      setPostings(Array.isArray(data) ? data : []);
    } catch {
      setPostings([]);
    } finally {
      setPostingsLoading(false);
    }
  }

  function closeApplyModal() {
    setShowApplyModal(false);
    setApplyStep('list');
    setSelectedPosting(null);
    setApplyName('');
    setApplyEmail('');
    setApplyPhone('');
    setApplyMsg('');
  }

  function selectPosting(posting) {
    setSelectedPosting(posting);
    setApplyStep('form');
    setApplyMsg('');
  }

  async function handleApplySubmit(e) {
    e.preventDefault();
    setApplyMsg('');
    setApplySubmitting(true);
    try {
      const res = await apiFetch('/api/public/jobapplications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postingId: selectedPosting.postingId,
          applicantName: applyName,
          applicantEmail: applyEmail,
          applicantPhone: applyPhone,
        }),
      });
      const data = await res.json();
      if (res.ok && data.status === 201) {
        setApplyStep('done');
      } else {
        setApplyMsg(data.message || 'Failed to submit application. Try again.');
      }
    } catch {
      setApplyMsg('Network error. Try again.');
    } finally {
      setApplySubmitting(false);
    }
  }

  return (
    <>
      <div className="page">
        <form className="card card--wide" onSubmit={handleSignup}>
          <h1>Admin Sign Up</h1>
          <p className="subtitle">Create your admin account</p>

          {message && <p className="error-msg">{message}</p>}

          <div className="grid">
            <InputField label="Company Name" value={companyName} onChange={setCompanyName} />
            <InputField label="First Name" value={firstName} onChange={setFirstName} />
            <InputField label="Last Name" value={lastName} onChange={setLastName} />
            <InputField label="Email" type="email" value={email} onChange={setEmail} />
            <InputField label="Work Phone" type="tel" value={workPhone} onChange={setWorkPhone} />
            <InputField label="Username" value={username} onChange={setUsername} />
            <InputField label="Password" type="password" value={password} onChange={setPassword} />
          </div>

          <button type="submit">Sign Up</button>

          <div className="apply-divider"><span>or</span></div>

          <button type="button" className="apply-job-btn" onClick={openApplyModal}>
            Apply for a Job
          </button>

          <p className="toggle">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>

      {showApplyModal && (
        <div className="apply-overlay" onClick={closeApplyModal}>
          <div className="apply-modal" onClick={(e) => e.stopPropagation()}>
            <button className="apply-modal-close" onClick={closeApplyModal} aria-label="Close">&times;</button>

            {applyStep === 'list' && (
              <>
                <h2>Open Job Postings</h2>
                <p className="apply-subtitle">Select a position to apply for</p>
                {postingsLoading && <p className="apply-loading">Loading postings...</p>}
                {!postingsLoading && postings.length === 0 && (
                  <p className="apply-empty">No open job postings available at the moment.</p>
                )}
                <div className="postings-list">
                  {postings.map((p) => (
                    <div key={p.postingId} className="posting-card" onClick={() => selectPosting(p)}>
                      <div className="posting-title">{p.jobTitle || `Job #${p.jobId}`}</div>
                      <div className="posting-dept">{p.departmentName || `Department #${p.departmentId}`}</div>
                      <div className="posting-dates">
                        Posted: {p.postingDate ? p.postingDate.split('T')[0] : '—'} &nbsp;|&nbsp;
                        Closes: {p.closingDate ? p.closingDate.split('T')[0] : '—'}
                      </div>
                      <span className="posting-apply-link">Apply &rarr;</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {applyStep === 'form' && selectedPosting && (
              <>
                <button className="apply-back" onClick={() => setApplyStep('list')}>&larr; Back</button>
                <h2>Apply: {selectedPosting.jobTitle || `Job #${selectedPosting.jobId}`}</h2>
                <p className="apply-subtitle">
                  {selectedPosting.departmentName || `Department #${selectedPosting.departmentId}`}
                  {selectedPosting.closingDate ? ` · Closes ${selectedPosting.closingDate.split('T')[0]}` : ''}
                </p>
                {applyMsg && <p className="error-msg">{applyMsg}</p>}
                <form className="apply-form" onSubmit={handleApplySubmit}>
                  <label>Full Name
                    <input
                      type="text"
                      value={applyName}
                      onChange={(e) => setApplyName(e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </label>
                  <label>Email
                    <input
                      type="email"
                      value={applyEmail}
                      onChange={(e) => setApplyEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </label>
                  <label>Phone
                    <input
                      type="tel"
                      value={applyPhone}
                      onChange={(e) => setApplyPhone(e.target.value)}
                      placeholder="+91-XXXXXXXXXX"
                      required
                    />
                  </label>
                  <button type="submit" disabled={applySubmitting}>
                    {applySubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </>
            )}

            {applyStep === 'done' && (
              <div className="apply-done">
                <div className="apply-done-icon">&#10003;</div>
                <h2>Application Submitted!</h2>
                <p>Your application has been received. We will get back to you soon.</p>
                <button className="apply-done-btn" onClick={closeApplyModal}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="theme-toggle-bottom">
        <ThemeToggle />
      </div>
    </>
  );
}

export default Signup;

