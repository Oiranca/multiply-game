import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isGuest, isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isGuest) {
    return (
      <Navigate
        to="/login"
        state={{ message: 'Debes crear un usuario para acceder al perfil' }}
        replace
      />
    );
  }

  return <>{children}</>;
};
