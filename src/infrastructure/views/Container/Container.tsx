import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../../components/NavBar/NavBar';

import './Container.css';
import { useWindowWidth } from "../../method/useWindowsWidth/useWindowWidth";

export const Container: FC = () => {
  console.log(useWindowWidth());
  return (
    <div className={'container-view'}>
      <header className={'header-container'}>
        <NavBar />
      </header>
      <section className={'section-body'}>
        <Outlet />
      </section>
    </div>
  );
};
