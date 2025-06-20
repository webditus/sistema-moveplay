import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BudgetProvider } from './context/BudgetContext';
import { AuthProvider } from './context/AuthContext';
import PublicBudgetGenerator from './components/public/PublicBudgetGenerator';
import AdminDashboard from './components/admin/AdminDashboard';
import Login from './components/admin/Login';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BudgetProvider>
        <Router>
          <div className="min-h-screen bg-primary">
            <Routes>
              <Route path="/" element={<PublicBudgetGenerator />} />
              <Route path="/admin/login" element={<Login />} />
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </BudgetProvider>
    </AuthProvider>
  );
}

export default App;