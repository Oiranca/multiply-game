import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Profile } from './Profile';
import { UserProvider } from '../../../context/UserContext';
import * as localStorageService from '../../../services/localStorage.service';

vi.mock('../../../services/localStorage.service', () => ({
  getMultiplicationStats: vi.fn(),
  getUser: vi.fn(),
  isLoggedIn: vi.fn(),
  isGuest: vi.fn(),
  isTokenValid: vi.fn()
}));

describe('Profile Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(localStorageService.isLoggedIn).mockReturnValue(true);
    vi.mocked(localStorageService.isGuest).mockReturnValue(false);
    vi.mocked(localStorageService.isTokenValid).mockReturnValue(true);
  });

  const renderProfile = (username = 'testuser') => {
    vi.mocked(localStorageService.getUser).mockReturnValue({
      username,
      multiplicationTables: { '2': 3, '5': 1, '10': 2 },
      createdAt: new Date().toISOString()
    });

    vi.mocked(localStorageService.getMultiplicationStats).mockReturnValue([
      { tableNumber: 2, completed: 3 },
      { tableNumber: 5, completed: 1 },
      { tableNumber: 10, completed: 2 }
    ]);

    return render(
      <BrowserRouter>
        <UserProvider>
          <Profile />
        </UserProvider>
      </BrowserRouter>
    );
  };

  it('renders profile header with username', () => {
    renderProfile('johndoe');
    expect(screen.getByText(/mi perfil/i)).toBeInTheDocument();
    expect(screen.getByText(/johndoe/i)).toBeInTheDocument();
  });

  it('displays total completions stat', () => {
    renderProfile();
    expect(screen.getByText(/6/)).toBeInTheDocument();
  });

  it('displays unique tables count', () => {
    renderProfile();
    expect(screen.getByText(/total de tablas practicadas:/i)).toBeInTheDocument();
    expect(screen.getByText('3', { selector: 'p' })).toBeInTheDocument();
  });

  it('shows list of completed tables', () => {
    renderProfile();
    expect(screen.getByText(/tabla del 2/i)).toBeInTheDocument();
    expect(screen.getByText(/tabla del 5/i)).toBeInTheDocument();
    expect(screen.getByText(/tabla del 10/i)).toBeInTheDocument();
  });

  it('shows completion count for each table', () => {
    renderProfile();
    const table2Card = screen.getByText(/tabla del 2/i).parentElement?.parentElement;
    expect(table2Card).toHaveTextContent('3');
    expect(table2Card).toHaveTextContent('veces');
    
    const table5Card = screen.getByText(/tabla del 5/i).parentElement?.parentElement;
    expect(table5Card).toHaveTextContent('1');
    expect(table5Card).toHaveTextContent('vez');
  });

  it('shows message when no tables completed', () => {
    vi.mocked(localStorageService.getUser).mockReturnValue({
      username: 'testuser',
      multiplicationTables: {},
      createdAt: new Date().toISOString()
    });

    vi.mocked(localStorageService.getMultiplicationStats).mockReturnValue([]);

    render(
      <BrowserRouter>
        <UserProvider>
          <Profile />
        </UserProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/aún no has completado ninguna tabla de multiplicar/i)).toBeInTheDocument();
  });
});
