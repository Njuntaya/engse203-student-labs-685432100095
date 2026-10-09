import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService.js';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      // Login สำเร็จ ให้กลับไปหน้า Dashboard และบังคับโหลดหน้าใหม่เพื่อให้ Header อัปเดตสถานะ
      window.location.href = '/'; 
    } catch (err) {
      setError(err.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section data-testid="page-login">
      <div className="page-heading">
        <div>
          <p className="eyebrow dark">STAFF ONLY</p>
          <h1>เข้าสู่ระบบเจ้าหน้าที่</h1>
          <p>เปลี่ยนสถานะและลบคำร้องได้หลังเข้าสู่ระบบ</p>
        </div>
      </div>
      <section className="panel form-panel" style={{ maxWidth: '400px' }}>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">อีเมล</label>
            <input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="field">
            <label htmlFor="password">รหัสผ่าน</label>
            <input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          {error && <p className="error" style={{ margin: '0.5rem 0' }}>{error}</p>}
          <button 
            className="button primary" 
            type="submit" 
            disabled={isLoading} 
            style={{ width: '100%', marginTop: '1rem' }}
          >
            {isLoading ? 'กำลังเข้าสู่ระบบ…' : 'เข้าสู่ระบบ'}
          </button>
        </form>
      </section>
    </section>
  );
}

export default LoginPage;   