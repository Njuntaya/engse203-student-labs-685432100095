import { Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage.jsx';
import AppLayout from './pages/AppLayout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import NewRequestPage from './pages/NewRequestPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import RequestDetailPage from './pages/RequestDetailPage.jsx';

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} /> 
           <Route element={<AboutPage />} path="about" />
           <Route element={<DashboardPage />} path="/" />
           <Route element={<NotFoundPage />} path="*" /> 
           <Route element={<NewRequestPage />} path="requests/new" />
           <Route element={<RequestDetailPage />} path="requests/:requestId" />
      </Route>
    </Routes>
  );
}

export default App;

