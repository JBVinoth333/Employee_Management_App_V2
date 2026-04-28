import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import DashBoard from './pages/DashBoard/DashBoard';
import Attendance from './pages/Attendance/Attendance';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const routerBase = (import.meta.env.VITE_APP_BASE_PATH || '/').replace(/\/$/, '') || '/EmployeeManagement';

  return (
    <ThemeProvider>
      <BrowserRouter basename={routerBase}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
          <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
