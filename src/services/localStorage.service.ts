export interface UserData {
  username: string;
  multiplicationTables: Record<string, number>;
  createdAt: string;
}

const STORAGE_KEY = 'multiply_game_users';
const CURRENT_USER_KEY = 'multiply_game_current_user';
const AUTH_TOKEN_KEY = 'multiply_game_auth_token';
const TOKEN_EXPIRY_HOURS = 48;

const normalizeUsername = (username: string): string => {
  if (!username) return username;
  return username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();
};

export const getAllUsers = (): UserData[] => {
  const usersJson = localStorage.getItem(STORAGE_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Save all users to localStorage
const saveAllUsers = (users: UserData[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

export const userExists = (username: string): boolean => {
  const normalized = normalizeUsername(username);
  const users = getAllUsers();
  return users.some(user => user.username === normalized);
};

export const getUser = (username?: string): UserData | null => {
  const targetUsername = username || localStorage.getItem(CURRENT_USER_KEY);
  if (!targetUsername) return null;

  const normalized = normalizeUsername(targetUsername);
  const users = getAllUsers();
  return users.find(user => user.username === normalized) || null;
};

export const saveUser = (username: string): void => {
  const normalized = normalizeUsername(username);
  if (userExists(normalized)) {
    return;
  }

  const users = getAllUsers();
  const newUser: UserData = {
    username: normalized,
    multiplicationTables: {},
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveAllUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, normalized);
};

export const setUserAndCreateToken = (username: string): void => {
  const normalized = normalizeUsername(username);
  if (!userExists(normalized)) {
    saveUser(normalized);
  }
  localStorage.setItem(CURRENT_USER_KEY, normalized);
  createAuthToken();
};

export const deleteUser = (username: string): void => {
  const normalized = normalizeUsername(username);
  const users = getAllUsers();
  const filteredUsers = users.filter(u => u.username !== normalized);
  saveAllUsers(filteredUsers);
};

export const updateMultiplicationTable = (
  tableNumber: number,
  username?: string
): void => {
  const targetUsername = username || localStorage.getItem(CURRENT_USER_KEY);
  if (!targetUsername) return;

  const normalized = normalizeUsername(targetUsername);
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.username === normalized);

  if (userIndex === -1) return;

  const user = users[userIndex];
  if (!user) return;

  const tableKey = tableNumber.toString();
  if (!user.multiplicationTables[tableKey]) {
    user.multiplicationTables[tableKey] = 0;
  }

  user.multiplicationTables[tableKey] += 1;
  saveAllUsers(users);
};

// Get multiplication table statistics
export const getMultiplicationTableStats = (
  username?: string
): {
  totalCompletions: number;
  uniqueTables: number;
  tables: Record<string, number>;
} => {
  const user = getUser(username);
  if (!user) {
    return { totalCompletions: 0, uniqueTables: 0, tables: {} };
  }

  const tables = user.multiplicationTables;
  const totalCompletions = Object.values(tables).reduce((sum: number, count: number) => sum + count, 0);
  const uniqueTables = Object.keys(tables).length;

  return {
    totalCompletions,
    uniqueTables,
    tables
  };
};

// Get multiplication statistics for display
export const getMultiplicationStats = (): {
  tableNumber: number;
  completed: number;
}[] => {
  const currentUser = getUser();
  if (!currentUser) return [];

  return Object.entries(currentUser.multiplicationTables)
    .map(([tableNumber, completed]: [string, number]) => ({
      tableNumber: parseInt(tableNumber),
      completed
    }))
    .sort((a, b) => a.tableNumber - b.tableNumber);
};

export const clearUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
  clearGuestFlag();
  clearAuthToken();
};

export const setCurrentUser = (username: string): void => {
  const normalized = normalizeUsername(username);
  if (!userExists(normalized)) {
    saveUser(normalized);
  }
  localStorage.setItem(CURRENT_USER_KEY, normalized);
  createAuthToken();
};

const generateToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15) + 
         Date.now().toString(36);
};

interface TokenData {
  token: string;
  expiresAt: number;
}

export const createAuthToken = (): string => {
  const token = generateToken();
  const expiresAt = Date.now() + (TOKEN_EXPIRY_HOURS * 60 * 60 * 1000);
  const tokenData: TokenData = {
    token,
    expiresAt
  };
  localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(tokenData));
  return token;
};

export const getAuthToken = (): string | null => {
  const tokenDataStr = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!tokenDataStr) return null;
  
  try {
    const tokenData: TokenData = JSON.parse(tokenDataStr);
    if (Date.now() > tokenData.expiresAt) {
      clearAuthToken();
      return null;
    }
    return tokenData.token;
  } catch {
    clearAuthToken();
    return null;
  }
};

export const clearAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const isTokenValid = (): boolean => {
  return getAuthToken() !== null;
};

export const isLoggedIn = (): boolean => {
  return isTokenValid() && localStorage.getItem(CURRENT_USER_KEY) !== null;
};

const GUEST_KEY = 'multiply_game_is_guest';

export const setGuestFlag = (): void => {
  localStorage.setItem(GUEST_KEY, 'true');
};

export const clearGuestFlag = (): void => {
  localStorage.removeItem(GUEST_KEY);
};

export const isGuest = (): boolean => {
  return localStorage.getItem(GUEST_KEY) === 'true';
};
