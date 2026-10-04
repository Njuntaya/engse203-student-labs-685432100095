import { apiFetch, ApiError } from './apiClient.js';

/**
 * Week 07 — เปลี่ยนจากอ่าน localStorage เป็นเรียก API จริง
 *
 * สังเกตว่า signature ของทุกฟังก์ชันเหมือนเดิมทุกตัว
 * → DashboardPage, RequestDetailPage, NewRequestPage ไม่ต้องแก้เลย
 * นี่คือประโยชน์ของ Service Layer ที่เราสร้างไว้ตั้งแต่ Week 05
 */

export { ApiError };

export async function getRequests(options = {}) {
  // scenario ยังใช้ได้เหมือนเดิม เพื่อให้ทดสอบสถานะต่าง ๆ ได้โดยไม่ต้องแกล้ง API
  if (options.scenario === 'error') {
    throw new ApiError('LAB scenario: จำลองการโหลดข้อมูลไม่สำเร็จ', 500);
  }
  if (options.scenario === 'empty') return [];

  const query = options.status ? `?status=${encodeURIComponent(options.status)}` : '';
  return apiFetch(`/api/requests${query}`);
}

export async function getRequestById(requestId) {
  try {
    return await apiFetch(`/api/requests/${encodeURIComponent(requestId)}`);
  } catch (error) {
    // 404 ไม่ใช่ความผิดพลาดของระบบ — แปลว่าไม่มีคำร้องรหัสนี้
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export async function addRequest(requestInput) {
  return apiFetch('/api/requests', {
    method: 'POST',
    body: JSON.stringify(requestInput),
  });
}

export async function updateRequestStatus(id, newStatus) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';  
  const response = await fetch(`${baseUrl}/api/requests/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    // ส่งข้อมูลสถานะใหม่เป็น JSON
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    let errorDetail = '';
    try {
      const errorData = await response.json();
      errorDetail = errorData.error || 'ไม่ระบุสาเหตุ';
    } catch {
      errorDetail = response.statusText;
    }
    throw new Error(`ไม่สามารถอัปเดตสถานะคำร้องได้ (${response.status}: ${errorDetail})`);
  }

  // ส่งคืนข้อมูล Request ที่ถูกแก้ไขแล้ว
  return response.json();
}

export async function deleteRequest(requestId) {
  await apiFetch(`/api/requests/${encodeURIComponent(requestId)}`, { method: 'DELETE' });
  // คืนรายการล่าสุดจากเซิร์ฟเวอร์ เพื่อให้หน้าจอตรงกับข้อมูลจริงเสมอ
  return getRequests();
}

export async function resetRequests() {
  // Week 07 ยังไม่มี endpoint reset — โหลดรายการปัจจุบันกลับมาแทน
  return apiFetch('/api/requests/reset', { method: 'POST' });
}
