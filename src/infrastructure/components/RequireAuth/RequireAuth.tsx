import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';

export const RequireAuth: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useUser();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};
