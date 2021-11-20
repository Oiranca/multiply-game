import React, { FC } from 'react';
import './Container.css';
import { NavBar } from '../../components/NavBar/NavBar';
import { PiecesResults } from '../../components/PiecesResults/PiecesResults';

export const Container: FC = () => {
  return (
    <div className={'container-view'}>
      <header className={'header-container'}>
        <NavBar />
      </header>
      <section className={'section-body'}>
        <PiecesResults numberToMultiply={1} />
      </section>
    </div>
  );
};
