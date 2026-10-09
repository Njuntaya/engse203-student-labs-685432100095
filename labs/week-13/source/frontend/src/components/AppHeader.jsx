import { NavLink } from 'react-router-dom';
import { getAuth, logout } from '../services/authService.js'; 

const links = [
  ['/', 'Dashboard'],
  ['/requests/new', 'New Request'],
  ['/about', 'About'],
];

function AppHeader() {
  // ดึงค่า token มาเช็กว่าล็อกอินอยู่หรือไม่
  const { token } = getAuth();

  function handleLogout() {
    logout();
    // เมื่อกดออกจากระบบ ให้รีเฟรชกลับไปหน้า Dashboard หลัก
    window.location.href = '/'; 
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div>
          <p className="eyebrow">ENGSE203 • LAB 13</p>
          <p className="brand">Campus Service Request</p>
        </div>
        <nav aria-label="เมนูหลัก">
          {links.map(([to, label]) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={to === '/'}
              key={to}
              to={to}
            >
              {label}
            </NavLink>
          ))}
          
          {/* ถ้ามี token ให้แสดงปุ่มออกจากระบบ ถ้าไม่มีให้แสดงปุ่มไปหน้าเข้าสู่ระบบ */}
          {token ? (
            <button 
              className="nav-link" 
              type="button" 
              onClick={handleLogout} 
              style={{ background: 'transparent', cursor: 'pointer' }}
            >
              ออกจากระบบ (เจ้าหน้าที่ฝ่ายบริการ)
            </button>
          ) : (
            <NavLink 
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} 
              to="/login"
            >
              เจ้าหน้าที่
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;