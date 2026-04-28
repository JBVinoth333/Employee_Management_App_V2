import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api';
import ThemeToggle from '../../components/ThemeToggle';
import AttendanceTable from './AttendanceTable';
import './Attendance.css';

function Attendance() {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAttendance = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiFetch('/api/attendances', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAttendance(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch attendance records');
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="attendance-container">
      <div className="attendance-header">
        <h1>Attendance Management</h1>
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading attendance records...</div>}

      <AttendanceTable records={attendance} loading={loading} />

      <div className="theme-toggle-bottom">
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Attendance;
