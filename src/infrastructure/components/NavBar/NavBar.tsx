import React, { FC } from 'react';
import Logo from '../../../assets/img/logo.png';
import '../NavBar/Navbar.css';

export const NavBar: FC<unknown> = () => {
  return (
    <header className={'container-navbar'}>
      <div className={'context-navbar'}>
        <section className={'section-logo'}>
          <img id={'logo'} src={Logo} alt={'Logo'} />
          <h1 id={'tittle'}>Your Multiply</h1>
        </section>
        <section className={'section-button-navbar'}>
          <button type={'button'} className={'navbar-button'}>
            Sign In
          </button>
          <button type={'button'} className={'navbar-button'}>
            Login
          </button>
        </section>
      </div>
    </header>
  );
};
