import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { userExists } from '../../../services/localStorage.service';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import Logo from '../../../assets/img/logo.png';

export const Login: FC = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { login, loginAsGuest } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Por favor, ingresa un nombre de usuario');
      return;
    }

    try {
      login(username);
      navigate('/');
    } catch (err) {
      setError('Error al acceder. Inténtalo de nuevo.');
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate('/');
  };

  const isExistingUser = userExists(username.trim()) && username.trim();

  return (
    <main className="min-h-screen bg-highlight flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Card className="w-full max-w-sm sm:max-w-md">
        <header className="text-center mb-6 sm:mb-8">
          <img
            src={Logo}
            alt="Your Multiply Logo"
            className="w-20 h-16 sm:w-24 sm:h-20 mx-auto mb-3 sm:mb-4"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-main mb-2">Your Multiply</h1>
          <p className="text-base sm:text-lg text-main">Bienvenido/a</p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6"
          aria-label="Formulario de inicio de sesión"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-main font-semibold mb-2 text-sm sm:text-base"
            >
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 text-base border-2 border-main rounded-lg 
                         focus-ring bg-white transition-shadow"
              placeholder="Ingresa tu nombre"
              maxLength={20}
              aria-label="Ingrese su nombre de usuario"
              aria-required="true"
              aria-invalid={!!error}
              aria-describedby={error ? 'username-error' : undefined}
              autoComplete="username"
            />
          </div>

          {error && (
            <div
              id="username-error"
              className="bg-red-100 border-2 border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base"
              role="alert"
              aria-live="polite"
            >
              <p className="font-semibold">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            aria-label={
              isExistingUser ? 'Acceder con su cuenta' : 'Crear nueva cuenta de usuario'
            }
          >
            {isExistingUser ? 'Acceder' : 'Crear Usuario'}
          </Button>
        </form>

        <div className="mt-4 sm:mt-6 text-center">
          <div className="relative my-4 sm:my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t-2 border-main"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-second text-main font-semibold">O</span>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            size="md"
            fullWidth
            onClick={handleGuestLogin}
            aria-label="Continuar sin crear cuenta como invitado"
          >
            Continuar como Invitado/a
          </Button>
        </div>

        <footer className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-main">
          <p>Al crear un usuario o acceder, tus progresos se guardarán automáticamente</p>
        </footer>
      </Card>
    </main>
  );
};
