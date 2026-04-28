import { useState } from 'react';

/**
 * Modal to fill in remaining employee fields when accepting a job application.
 * jobId and departmentId are pre-filled from the job posting (read-only).
 */
function AcceptApplicationModal({ application, posting, jobs, departments, onAccept, onClose }) {
  // Pre-fill name parts from applicantName
  const nameParts = (application.applicantName || '').trim().split(' ');
  const [firstName, setFirstName] = useState(nameParts[0] || '');
  const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') || '');
  const [email, setEmail] = useState(application.applicantEmail || '');
  const [phone, setPhone] = useState(application.applicantPhone || '');
  const [dob, setDob] = useState(application.dateOfBirth || '');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('');
  const [hireDate, setHireDate] = useState(new Date().toISOString().split('T')[0]);
  const [salary, setSalary] = useState('');
  const [pan, setPan] = useState('');

  const job = jobs.find((j) => j.jobId === posting.jobId);
  const dept = departments.find((d) => d.departmentId === posting.departmentId);

  function handleSubmit(e) {
    e.preventDefault();
    onAccept({
      applicationId: application.applicationId,
      action: 'accept',
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      dateOfBirth: dob,
      gender,
      address: address.trim(),
      hireDate,
      salary: Number(salary),
      pan: pan.trim(),
    });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box modal-wide" onClick={(e) => e.stopPropagation()}>
        <h2>Accept Application &amp; Add Employee</h2>
        <p className="modal-sub">
          Accepting <strong>{application.applicantName}</strong> for{' '}
          <strong>{job ? job.jobTitle : `Job #${posting.jobId}`}</strong> in{' '}
          <strong>{dept ? dept.departmentName : `Dept #${posting.departmentId}`}</strong>
        </p>

        <form className="grid" onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>Phone</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <label>Date of Birth</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>
          <div>
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="full-width">
            <label>Address</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div>
            <label>Hire Date</label>
            <input type="date" value={hireDate} onChange={(e) => setHireDate(e.target.value)} required />
          </div>
          <div>
            <label>Job (from posting)</label>
            <input type="text" value={job ? job.jobTitle : `Job #${posting.jobId}`} readOnly disabled />
          </div>
          <div>
            <label>Department (from posting)</label>
            <input type="text" value={dept ? dept.departmentName : `Dept #${posting.departmentId}`} readOnly disabled />
          </div>
          <div>
            <label>Salary</label>
            <input type="number" min="0" step="0.01" value={salary} onChange={(e) => setSalary(e.target.value)} required />
          </div>
          <div>
            <label>PAN</label>
            <input type="text" value={pan} onChange={(e) => setPan(e.target.value)} />
          </div>

          <div className="full-width modal-actions">
            <button type="submit" className="btn-accept">Accept &amp; Add Employee</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AcceptApplicationModal;
