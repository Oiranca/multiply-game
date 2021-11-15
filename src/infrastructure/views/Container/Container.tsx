import React, { FC } from 'react';
import './Container.css';
import { NavBar } from '../../components/NavBar/NavBar';
import { PiecesNumbers } from '../../components/PiecesNumbers/PiecesNumbers';
import { NumberForMultiply } from '../../../mock/NumberForMultiply';
import { NumberToMultiply } from '../../../mock/NumberToMultiply';

export const Container: FC = () => {
  return (
    <div className={'container-view'}>
      <header className={'header-container'}>
        <NavBar />
      </header>
      <section className={'section-body'}>
        <PiecesNumbers numberForMultiply={NumberForMultiply} numberToMultiply={NumberToMultiply}/>
      </section>
    </div>
  );
};
