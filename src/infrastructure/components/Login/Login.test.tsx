import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Login } from './Login';
import { UserProvider } from '../../../context/UserContext';
import * as localStorageService from '../../../services/localStorage.service';

vi.mock('../../../services/localStorage.service', () => ({
  userExists: vi.fn(),
  saveUser: vi.fn(),
  getUser: vi.fn(),
  isLoggedIn: vi.fn(),
  setCurrentUser: vi.fn(),
  setUserAndCreateToken: vi.fn(),
  setGuestFlag: vi.fn(),
  clearGuestFlag: vi.fn(),
  clearUser: vi.fn(),
  isGuest: vi.fn(),
  isTokenValid: vi.fn(),
  createAuthToken: vi.fn()
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.mocked(localStorageService.isLoggedIn).mockReturnValue(false);
    vi.mocked(localStorageService.isTokenValid).mockReturnValue(false);
  });

  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <UserProvider>
          <Login />
        </UserProvider>
      </BrowserRouter>
    );
  };

  it('renders login form with all elements', () => {
    renderLogin();

    expect(screen.getByText('Your Multiply')).toBeInTheDocument();
    expect(screen.getByText('Bienvenido/a')).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre de usuario/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ingresa tu nombre/i)).toBeInTheDocument();
    expect(screen.getByText(/crear usuario/i)).toBeInTheDocument();
    expect(screen.getByText(/continuar como invitado/i)).toBeInTheDocument();
  });

  it('shows "Crear Usuario" button for new users', () => {
    vi.mocked(localStorageService.userExists).mockReturnValue(false);
    renderLogin();

    const input = screen.getByPlaceholderText(/ingresa tu nombre/i);
    fireEvent.change(input, { target: { value: 'newuser' } });

    expect(screen.getByText(/crear usuario/i)).toBeInTheDocument();
  });

  it('shows "Acceder" button for existing users', () => {
    vi.mocked(localStorageService.userExists).mockReturnValue(true);
    renderLogin();

    const input = screen.getByPlaceholderText(/ingresa tu nombre/i);
    fireEvent.change(input, { target: { value: 'existinguser' } });

    waitFor(() => {
      expect(screen.getByRole('button', { name: /acceder/i })).toBeInTheDocument();
    });
  });

  it('shows error when submitting empty username', () => {
    renderLogin();

    const submitButton = screen.getByText(/crear usuario/i);
    fireEvent.click(submitButton);

    expect(
      screen.getByText(/por favor, ingresa un nombre de usuario/i)
    ).toBeInTheDocument();
  });

  it('navigates to home after successful login', async () => {
    vi.mocked(localStorageService.userExists).mockReturnValue(false);
    renderLogin();

    const input = screen.getByPlaceholderText(/ingresa tu nombre/i);
    const submitButton = screen.getByText(/crear usuario/i);

    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('handles guest login correctly', async () => {
    renderLogin();

    const guestButton = screen.getByText(/continuar como invitado/i);
    fireEvent.click(guestButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('limits username to 20 characters', () => {
    renderLogin();

    const input = screen.getByPlaceholderText(/ingresa tu nombre/i) as HTMLInputElement;
    expect(input.maxLength).toBe(20);
  });
});
