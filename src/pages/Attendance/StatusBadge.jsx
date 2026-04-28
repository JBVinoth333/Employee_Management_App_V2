const STATUS_COLORS = {
  Present: '#10b981',
  Absent: '#ef4444',
  Remote: '#3b82f6',
  OnLeave: '#f59e0b',
};

function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || '#6b7280';
  return (
    <span className="status-badge" style={{ backgroundColor: color }}>
      {status}
    </span>
  );
}

export default StatusBadge;
