import { useState } from 'react';
import InputField from '../../../components/InputField';

function AddEmployeeForm({ departments, jobs, onAdd }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('');
  const [hireDate, setHireDate] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [jobId, setJobId] = useState('');
  const [salary, setSalary] = useState('');
  const [pan, setPan] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({
      firstName,
      lastName,
      email,
      phone,
      phone2,
      dateOfBirth: dob,
      gender,
      address,
      hireDate,
      departmentId: Number(departmentId),
      jobId: Number(jobId),
      salary: Number(salary),
      pan,
    });
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setPhone2('');
    setDob('');
    setGender('Male');
    setAddress('');
    setHireDate('');
    setDepartmentId('');
    setJobId('');
    setSalary('');
    setPan('');
  }

  return (
    <form className="add-emp-form" onSubmit={handleSubmit}>
      <h2>Add Employee</h2>
      <div className="grid">
        <InputField label="First Name" value={firstName} onChange={setFirstName} />
        <InputField label="Last Name" value={lastName} onChange={setLastName} />
        <InputField label="Email" type="email" value={email} onChange={setEmail} />
        <InputField label="Phone" type="tel" value={phone} onChange={setPhone} />
        <InputField label="Alternate Phone" type="tel" value={phone2} onChange={setPhone2} />
        <InputField label="Date of Birth" type="date" value={dob} onChange={setDob} />
        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <InputField label="Address" value={address} onChange={setAddress} />
        <InputField label="Hire Date" type="date" value={hireDate} onChange={setHireDate} />
        <div>
          <label>Department</label>
          <select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required>
            <option value="">Select Department</option>
            {departments.map((d) => (
              <option key={d.departmentId} value={d.departmentId}>{d.departmentName}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Job</label>
          <select value={jobId} onChange={(e) => setJobId(e.target.value)} required>
            <option value="">Select Job</option>
            {jobs.map((j) => (
              <option key={j.jobId} value={j.jobId}>
                {j.jobTitle}
                {Number.isFinite(j.minSalary) && Number.isFinite(j.maxSalary)
                  ? ` (${j.minSalary} - ${j.maxSalary})`
                  : ''}
              </option>
            ))}
          </select>
        </div>
        <InputField label="Salary" type="number" value={salary} onChange={setSalary} />
        <InputField label="PAN" value={pan} onChange={setPan} />
      </div>
      <button type="submit">Add Employee</button>
    </form>
  );
}

export default AddEmployeeForm;
