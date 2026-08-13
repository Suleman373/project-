import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
