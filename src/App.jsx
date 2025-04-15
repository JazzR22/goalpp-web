import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MonthView from './pages/MonthView';
import Daily from './pages/Daily';
import Overview from './pages/Overview';
import Welcome from './pages/Welcome';

export default function App() {
  const token = localStorage.getItem('token')

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              !token ? (
                <Navigate to="daily" replace />
              ) : (
                <Navigate to="login" replace />
              )
            }
          />

          {/* Páginas internas protegidas */}
          <Route path="daily" element={<Daily />} />
          <Route path="month" element={<MonthView />} />
          <Route path="overview" element={<Overview />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
