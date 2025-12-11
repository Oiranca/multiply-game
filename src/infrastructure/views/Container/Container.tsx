import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/NavBar';

export const Container: FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-highlight">
      <header>
        <NavBar />
      </header>
      <main className="flex-1 flex justify-center items-start">
        <Outlet />
      </main>
    </div>
  );
};
