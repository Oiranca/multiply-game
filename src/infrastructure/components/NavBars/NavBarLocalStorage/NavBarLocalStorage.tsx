import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../../assets/img/logo.png';
import '../Navbar.css';

export const NavBarLocalStorage: FC<unknown> = () => {
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate('/logIn');
  };

  return (
    <header className={'container-navbar'}>
      <div className={'context-navbar'}>
        <section className={'section-logo'}>
          <img id={'logo'} src={Logo} alt={'Logo'} />
          <h1 id={'tittle'}>Your Multiply</h1>
        </section>
        <section className={'section-button-navbar'}>
          <button type={'button'} id={'logIn-button'} onClick={onNavigate}>
            Log In
          </button>
        </section>
      </div>
    </header>
  );
};