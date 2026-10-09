import { apiFetch } from './apiClient.js';

export async function login(email, password) {
  // ยิง API ไปหา Backend เพื่อขอเข้าสู่ระบบ
  const data = await apiFetch('/api/auth/login', { // ปรับ path ให้ตรงกับ API ของคุณ เช่น /api/auth/login
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  // เก็บ Token และ Role ลงใน localStorage ของเบราว์เซอร์
  localStorage.setItem('token', data.token);
  localStorage.setItem('role', data.user?.role || data.role || 'staff'); 
  
  return data;
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
}

export function getAuth() {
  return {
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role')
  };
}