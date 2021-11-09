import React, { FC } from 'react';
import './Home.css';
import Logo from '../../../assets/img/logo.png';

export const Home: FC = () => {
  return (
    <div className={'container-home'}>
      <header className={'header-home'}>
        <h1>Your Multiply</h1>
      </header>
      <section className={'section-home'}>
        <p>
          Aquí podrás aprender las tablas de multiplicar de forma divertida y además si realizas
          correctamente el ejercicio podrás acumular puntos, mientras aprendes.
        </p>
      </section>
      <footer className={'footer-home'}>
        <img id={'home-logo'} src={Logo} alt={'Logo'} />
      </footer>
    </div>
  );
};
