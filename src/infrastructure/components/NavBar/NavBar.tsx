import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import Logo from '../../../assets/img/logo.png';

export const NavBar: FC = () => {
  const navigate = useNavigate();
  const { isGuest, logout, isAuthenticated } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const showProfileButton = isAuthenticated && !isGuest;

  const onNavigate = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const onProfileNavigate = () => {
    navigate('/profile');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-center items-center">
      <div className="flex justify-between items-center m-2 bg-main w-full md:w-[70%] px-4 py-2 relative rounded-lg shadow-main">
        <section className="flex flex-row justify-start items-center gap-2 md:gap-4">
          <img id="logo" src={Logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
          <h1 className="text-second text-sm sm:text-base md:text-2xl font-bold">
            Your Multiply
          </h1>
        </section>

        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 text-second hover:bg-second/20 rounded-lg transition-colors focus-ring"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-second transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-second mt-1.5 transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-second mt-1.5 transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </button>

        <section
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } md:flex absolute md:relative top-full left-0 right-0 md:top-auto md:left-auto md:right-auto mt-2 md:mt-0 bg-main md:bg-transparent flex-col md:flex-row justify-center items-stretch md:items-center gap-3 md:gap-2 w-full md:w-auto p-4 md:p-0 z-50 shadow-main md:shadow-none rounded-lg md:rounded-none border-2 border-second md:border-0`}
        >
          <button
            type="button"
            onClick={onNavigate}
            className="bg-transparent border-4 border-dashed border-second w-full md:w-20 md:h-16 text-sm md:text-base font-bold text-second rounded-lg md:rounded-tl-2xl md:rounded-tr-2xl hover:cursor-pointer hover:bg-second hover:text-main transition-all duration-200 py-4 md:py-0 focus-ring active:scale-95"
          >
            Home
          </button>

          {showProfileButton && (
            <button
              type="button"
              onClick={onProfileNavigate}
              className="bg-transparent border-4 border-dashed border-second w-full md:w-20 md:h-16 text-sm md:text-base font-bold text-second rounded-lg md:rounded-tl-2xl md:rounded-tr-2xl hover:cursor-pointer hover:bg-second hover:text-main transition-all duration-200 py-4 md:py-0 focus-ring active:scale-95"
            >
              Perfil
            </button>
          )}

          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              className="bg-transparent border-4 border-dashed border-second w-full md:w-20 md:h-16 text-sm md:text-base font-bold text-second rounded-lg md:rounded-tl-2xl md:rounded-tr-2xl hover:cursor-pointer hover:bg-second hover:text-main transition-all duration-200 py-4 md:py-0 focus-ring active:scale-95"
            >
              Salir
            </button>
          )}
        </section>
      </div>
    </nav>
  );
};
