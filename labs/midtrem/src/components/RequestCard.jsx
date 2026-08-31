import { Link } from 'react-router-dom';

function RequestCard({ request, onDeleteRequest, onMarkDone }) {
  return (
    <article className="request-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3><Link to={`/requests/${request.id}`}>{request.requestType}</Link></h3>
        <p>{request.location}</p>
        <p>{request.details}</p>
        <p><span className={`badge ${request.status}`}>{request.status}</span> · {request.priority}</p>
      </div>
      <div className="request-actions">
        {request.status !== 'completed' && (
          <button className="button success" type="button" onClick={() => onMarkDone(request.id)} aria-label={`ทำเครื่องหมายคำร้อง ${request.id} ว่าเสร็จสิ้น`}>
            ทำเสร็จ
          </button>
        )}
        <button className="button danger" type="button" onClick={() => onDeleteRequest(request.id)} aria-label={`ลบคำร้อง ${request.id}`}>
          ลบ
        </button>
      </div>
    </article>
  );
}

export default RequestCard;