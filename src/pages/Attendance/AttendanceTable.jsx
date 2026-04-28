import StatusBadge from './StatusBadge';

function AttendanceRow({ record }) {
  return (
    <tr>
      <td>{record.employeeName || `Employee ${record.employeeId}`}</td>
      <td>{record.attendanceDate}</td>
      <td>{record.checkIn || '-'}</td>
      <td>{record.checkOut || '-'}</td>
      <td>
        <StatusBadge status={record.status} />
      </td>
    </tr>
  );
}

function AttendanceTable({ records, loading }) {
  return (
    <div className="attendance-table-wrapper">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record, index) => (
              <AttendanceRow key={index} record={record} />
            ))
          ) : (
            !loading && (
              <tr>
                <td colSpan="5" className="no-data">
                  No attendance records found
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
