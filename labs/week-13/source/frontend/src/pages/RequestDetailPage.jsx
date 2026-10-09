import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState.jsx';
import LoadingState from '../components/LoadingState.jsx';
import useManualReload from '../hooks/useManualReload.js';
import { getRequestById, updateRequestStatus } from '../services/requestService.js'; 
import { getAuth } from '../services/authService.js'; 

function RequestDetailPage() {
  const { requestId } = useParams();
  const [loadState, setLoadState] = useState('loading');
  const [request, setRequest] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [reloadKey, reload] = useManualReload();
  
  // ดึง role จาก localStorage
  const { role } = getAuth();

  useEffect(() => {
    let ignore = false;
    setLoadState('loading');
    getRequestById(requestId).then((result) => {
      if (ignore) return;
      setRequest(result);
      setLoadState('success');
    }).catch((error) => {
      if (ignore) return;
      setErrorMessage(error instanceof Error ? error.message : 'โหลดรายละเอียดไม่สำเร็จ');
      setLoadState('error');
    });
    return () => { ignore = true; };
  }, [requestId, reloadKey]);

  //  ฟังก์ชันสำหรับให้ Staff เปลี่ยนสถานะ
  async function handleStatusChange(event) {
    const newStatus = event.target.value;
    try {
      await updateRequestStatus(requestId, newStatus);
      // อัปเดตข้อมูลบนหน้าจอให้เป็นสถานะใหม่ทันที
      setRequest({ ...request, status: newStatus }); 
    } catch (error) {
      alert('เปลี่ยนสถานะไม่สำเร็จ: ' + error.message);
    }
  }

  return (
    <section data-testid="page-request-detail">
      <div className="page-heading"><div><p className="eyebrow dark">DYNAMIC ROUTE</p><h1>รายละเอียดคำร้อง</h1><p>Request ID: <code>{requestId}</code></p></div></div>
      {loadState === 'loading' && <LoadingState message="กำลังโหลดรายละเอียด…" />}
      {loadState === 'error' && <ErrorState message={errorMessage} onRetry={reload} />}
      {loadState === 'success' && !request && (
        <section className="state-card"><h2>ไม่พบคำร้อง</h2><p>ไม่พบข้อมูลสำหรับ ID <code>{requestId}</code></p><Link to="/">กลับ Dashboard</Link></section>
      )}
      {loadState === 'success' && request && (
        <article className="panel detail-card">
          <h2>{request.requestType}</h2>
          <dl>
            <div><dt>ID</dt><dd>{request.id}</dd></div>
            <div><dt>ผู้แจ้ง</dt><dd>{request.requesterName}</dd></div>
            <div><dt>สถานที่</dt><dd>{request.location}</dd></div>
            <div><dt>รายละเอียด</dt><dd>{request.details}</dd></div>
            <div><dt>ความเร่งด่วน</dt><dd>{request.priority}</dd></div>
            <div>
              <dt>สถานะ</dt>
              <dd>
                {/*  ถ้าเป็น staff ให้แสดง <select> ถ้าไม่ใช่ให้แสดง text ปกติ */}
                {role === 'staff' ? (
                  <select 
                    value={request.status} 
                    onChange={handleStatusChange}
                    style={{ padding: '0.4rem', borderRadius: '0.4rem', border: '1px solid #c8d8eb' }}
                  >
                    <option value="pending">รอดำเนินการ</option>
                    <option value="in-progress">กำลังดำเนินการ</option>
                    <option value="completed">เสร็จสิ้น</option>
                  </select>
                ) : (
                  request.status
                )}
              </dd>
            </div>
          </dl>
          <Link to="/">กลับ Dashboard</Link>
        </article>
      )}
    </section>
  );
}

export default RequestDetailPage;