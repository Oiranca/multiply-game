import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../../assets/img/logo.png';
import '../Navbar.css';

export const NavBar: FC<unknown> = () => {
  const navigate = useNavigate();
  const buttonSelected = (buttonId: string) => {
    return buttonId
      .split('-')
      .filter(buttonName => buttonName !== 'button')
      .toString();
  };
  const handleNavigation = (e: React.MouseEvent<HTMLElement>) => {
    const buttonId = e.currentTarget.id;

    navigate(buttonSelected(buttonId));
  };

  return (
    <header className={'container-navbar'}>
      <div className={'context-navbar'}>
        <section className={'section-logo'}>
          <img id={'logo'} src={Logo} alt={'Logo'} />
          <h1 id={'tittle'}>Your Multiply</h1>
        </section>
        <section className={'section-button-navbar'}>
          <button type={'button'} id={'signIn-button'} onClick={handleNavigation}>
            Sign In
          </button>
          <button type={'button'} id={'logIn-button'} onClick={handleNavigation}>
            Login
          </button>
        </section>
      </div>
    </header>
  );
};
