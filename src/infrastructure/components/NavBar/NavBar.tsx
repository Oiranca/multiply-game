import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/img/logo.png';
import './Navbar.css';

export const NavBar: FC<unknown> = () => {
  const navigate = useNavigate();

  const onNavigate = (event: React.MouseEvent) => {
    const buttonSelect = event.currentTarget.id;
    switch (buttonSelect) {
      case 'logIn-button':
        navigate('/multiply/logIn');
        break;
      case 'home-button':
        navigate('/multiply');
        break;
    }
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
            LogIn
          </button>
          <button type={'button'} id={'home-button'} onClick={onNavigate}>
            Home
          </button>
        </section>
      </div>
    </header>
  );
};
