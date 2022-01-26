import React, { FC } from 'react';

import './LogIn.css';

export const LogIn: FC = () => {
  return (
    <section className={'container-login'}>
      <header id={'header-login'}>
        <h1 id={'title-logIn'}>Login</h1>
      </header>
      <form className={'body-logIn'} method={'post'}>
        <section className={'section-logIn'}>
          <h2>Usuario</h2>
          <input type={'text'} className={'logIn-input'} />
        </section>
        <section className={'section-logIn'}>
          <h2>Contraseña</h2>
          <input type={'password'} className={'logIn-input'} />
        </section>
        <section className={'section-logIn'}>
          <button type={'submit'} id={'button-logIn'}>
            Aceptar
          </button>
        </section>
      </form>
    </section>
  );
};
