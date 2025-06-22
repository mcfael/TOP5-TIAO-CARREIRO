import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Admin from './views/Admin';
import Register from './views/Register';
import { AuthProvider} from './auth/AuthContext';


export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </AuthProvider>
    
  );
  document.getElementById('root');
}