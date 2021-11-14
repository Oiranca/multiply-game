import React, { FC } from 'react';
import './Container.css';
import { NavBar } from '../../components/NavBar/NavBar';
import { PiecesNumbers } from '../../components/PiecesNumbers/PiecesNumbers';

export const Container: FC = () => {
  return (
    <div className={'container-view'}>
      <header className={'header-container'}>
        <NavBar />
      </header>
      <section className={'section-body'}>
        <PiecesNumbers />
      </section>
    </div>
  );
};
