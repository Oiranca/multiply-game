import React, { FC } from 'react';
import './Container.css';
import { NavBar } from '../../components/NavBar/NavBar';
import { SelectMultiply } from '../../components/SelectMultiply/SelectMultiply';

export const Container: FC = () => {
  return (
    <div className={'container-view'}>
      <header className={'header-container'}>
        <NavBar />
      </header>
      <section className={'section-body'}>
        <SelectMultiply />
      </section>
    </div>
  );
};
