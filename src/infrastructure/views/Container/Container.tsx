import React, { FC } from 'react';
import './Container.css';
import { NavBar } from '../../components/NavBar/NavBar';
import { PiecesResults } from '../../PiecesResults/PiecesResults';

export const Container: FC = () => {
  return (
    <div className={'container-view'}>
      <header className={'header-container'}>
        <NavBar />
      </header>
      <section className={'section-body'}>
        <PiecesResults result={[0,1,2,3,4,5,6,7,8,9,10]} />
      </section>
    </div>
  );
};
