import { Link } from 'react-router-dom';
import { getAuth } from '../services/authService.js';

function RequestCard({ request, onDeleteRequest }) {

  //ดึงค่า role มาเพื่อตรวจสอบว่าเป็น staff หรือไม่
  const { role } = getAuth();

  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3><Link to={`/requests/${request.id}`}>{request.requestType}</Link></h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
        <p><span className={`badge ${request.status}`}>{request.status}</span> · {request.priority}</p>
      </div>
      
      {/* ถ้า role เป็น 'staff' ให้แสดงปุ่มลบ ถ้าไม่ใช่ให้ซ่อนไว้ */}
      {role === 'staff' && (
        <button 
          className="button danger" 
          type="button" 
          onClick={() => onDeleteRequest(request.id)} 
          aria-label={`ลบคำร้อง ${request.id}`}
        >
          ลบ
        </button>
      )}
    </article>
  );
}

export default RequestCard;