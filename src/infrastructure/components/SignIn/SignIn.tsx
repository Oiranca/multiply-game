import React, { FC } from 'react';
import './SignIn.css';

export const SignIn: FC = () => {
  return (
    <section className={'container-signIn'}>
      <header id={'header-signIn'}>
        <h1 id={'title-signIn'}>Sign In</h1>
      </header>
      <form className={'body-signIn'} method={'post'}>
        <section className={'section-signIn'}>
          <h2>Nombre</h2>
          <input type={'text'} className={'signIn-input'} />
        </section>
        <section className={'section-signIn'}>
          <h2>Apellidos</h2>
          <input type={'text'} className={'signIn-input'} />
        </section>
        <section className={'section-signIn'}>
          <h2>Email</h2>
          <input type={'email'} className={'signIn-input'} />
        </section>
        <section className={'section-signIn'}>
          <h2>Contraseña</h2>
          <input type={'password'} className={'signIn-input'} />
        </section>
        <section className={'section-signIn'}>
          <h2>Repetir Contraseña</h2>
          <input type={'password'} className={'signIn-input'} />
        </section>
        <section className={'section-signIn'}>
          <button type={'submit'} id={'button-signIn'}>Aceptar</button>
        </section>
      </form>
    </section>
  );
};
