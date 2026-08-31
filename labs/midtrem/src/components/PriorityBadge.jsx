function PriorityBadge({ priority }) {
  let label = 'ไม่ระบุ';
  let className = 'priority-unknown';

  if (priority === 'urgent') {
    label = 'เร่งด่วน';
    className = 'priority-urgent';
  } else if (priority === 'normal') {
    label = 'ปกติ';
    className = 'priority-normal';
  }

  return (
    <span className={className}>
      {label}
    </span>
  );
}

export default PriorityBadge;