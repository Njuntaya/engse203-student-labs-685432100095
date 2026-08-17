import { Routes, Route } from 'react-router-dom';
import AppLayout from './pages/AppLayout.jsx';
import AboutPage from './pages/AboutPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import NewRequestPage from './pages/NewRequestPage.jsx';
import RequestDetailPage from './pages/RequestDetailPage.jsx';

function App() {
  return (
    <Routes>
        <Route element={<AppLayout />}>
            <Route index element={<DashboardPage />} /> // หน้าแรกของ AppLayout จะเป็น DashboardPage
            <Route element={<AboutPage />} path="about" />
            <Route element={<DashboardPage />} path="/" />
            <Route element={<NotFoundPage />} path="*" /> // * คือ ใดๆ path ที่ไม่ match กับ route ไหนเลย จะไป NotFoundPage
            <Route element={<NewRequestPage />} path="requests/new" />
            <Route element={<RequestDetailPage />} path="requests/:requestId" />
        </Route>
    </Routes>
  );
  // TODO 5A-CP02: เปลี่ยนเป็น <Routes> ที่มี AppLayout เป็นกรอบ
}

export default App;

