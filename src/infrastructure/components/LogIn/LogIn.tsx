import React, { FC } from 'react';

import './LogIn.css';

export const LogIn: FC = () => {
  return (
    <section className={'container-login'}>
      <header id={'header-login'}>
        <h1>Login</h1>
      </header>
      <article className={'body-login'}>
          <h2>Usuario</h2>
          <input type={'text'} id={'user-input'} />
          <h2>Contraseña</h2>
          <input type={'text'} id={'password-input'} />
      </article>
    </section>
  );
};
