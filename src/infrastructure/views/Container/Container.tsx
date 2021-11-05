import React, { FC } from 'react';
import './Container.css';
import { NavBar } from '../../components/NavBar/NavBar';

export const Container: FC = () => {
  return (
    <div className={'container-view'}>
      <NavBar />
    </div>
  );
};
