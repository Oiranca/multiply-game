import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { NavBarLocalStorage } from '../../components/NavBars/NavBarLocalStorage/NavBarLocalStorage';
import './Container.css';

export const Container: FC = () => {
  return (
    <div className={'container-view'}>
      <header className={'header-container'}>
        <NavBarLocalStorage />
      </header>
      <section className={'section-body'}>
        <Outlet />
      </section>
    </div>
  );
};
