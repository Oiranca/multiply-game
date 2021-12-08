import React, { FC } from 'react';
import './Container.css';
import { NavBar } from '../../components/NavBar/NavBar';
import { Multiply } from '../../components/Multiply/Multiply';

export const Container: FC = () => {
  return (
    <div className={'container-view'}>
      <header className={'header-container'}>
        <NavBar />
      </header>
      <section className={'section-body'}>
        <Multiply numberToMultiply={2}/>
      </section>
    </div>
  );
};
