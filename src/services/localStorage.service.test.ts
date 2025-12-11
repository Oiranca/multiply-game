import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  saveUser,
  getUser,
  userExists,
  updateMultiplicationTable,
  getMultiplicationTableStats,
  getAllUsers,
  deleteUser
} from './localStorage.service';

describe('localStorage Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('saveUser', () => {
    it('creates a new user with initial data', () => {
      saveUser('testuser');

      const user = getUser('testuser');
      expect(user).toBeDefined();
      expect(user?.username).toBe('Testuser');
      expect(user?.multiplicationTables).toEqual({});
      expect(user?.createdAt).toBeDefined();
    });

    it('normalizes username to capitalcase', () => {
      saveUser('TESTUSER');
      const user = getUser('testuser');
      expect(user?.username).toBe('Testuser');
    });

    it('does not overwrite existing user', () => {
      saveUser('testuser');
      const originalUser = getUser('testuser');

      saveUser('TESTUSER');
      const sameUser = getUser('Testuser');

      expect(sameUser?.createdAt).toBe(originalUser?.createdAt);
    });
  });

  describe('getUser', () => {
    it('returns null for non-existent user', () => {
      const user = getUser('nonexistent');
      expect(user).toBeNull();
    });

    it('returns user data for existing user', () => {
      saveUser('testuser');
      const user = getUser('testuser');

      expect(user).not.toBeNull();
      expect(user?.username).toBe('Testuser');
    });

    it('normalizes username when searching', () => {
      saveUser('testuser');
      const user1 = getUser('TESTUSER');
      const user2 = getUser('TestUser');
      const user3 = getUser('testuser');

      expect(user1?.username).toBe('Testuser');
      expect(user2?.username).toBe('Testuser');
      expect(user3?.username).toBe('Testuser');
    });
  });

  describe('userExists', () => {
    it('returns false for non-existent user', () => {
      expect(userExists('nonexistent')).toBe(false);
    });

    it('returns true for existing user', () => {
      saveUser('testuser');
      expect(userExists('testuser')).toBe(true);
    });

    it('normalizes username and is case-insensitive', () => {
      saveUser('TestUser');
      expect(userExists('testuser')).toBe(true);
      expect(userExists('TESTUSER')).toBe(true);
      expect(userExists('TestUser')).toBe(true);
      expect(userExists('tEsTuSeR')).toBe(true);
    });
  });

  describe('updateMultiplicationTable', () => {
    it('increments completion count for a table', () => {
      saveUser('testuser');

      updateMultiplicationTable(5, 'testuser');
      const user = getUser('testuser');

      expect(user?.multiplicationTables['5']).toBe(1);
    });

    it('normalizes username when updating table', () => {
      saveUser('testuser');

      updateMultiplicationTable(5, 'TESTUSER');
      const user = getUser('testuser');

      expect(user?.multiplicationTables['5']).toBe(1);
    });

    it('increments existing completion count', () => {
      saveUser('testuser');

      updateMultiplicationTable(5, 'testuser');
      updateMultiplicationTable(5, 'TESTUSER');
      const user = getUser('testuser');

      expect(user?.multiplicationTables['5']).toBe(2);
    });

    it('uses current user from localStorage if not specified', () => {
      saveUser('currentuser');
      localStorage.setItem('multiply_game_current_user', 'Currentuser');

      updateMultiplicationTable(7);
      const user = getUser('currentuser');

      expect(user?.multiplicationTables['7']).toBe(1);
    });

    it('does nothing if user does not exist', () => {
      updateMultiplicationTable(5, 'nonexistent');
      // Should not throw error
      expect(getUser('nonexistent')).toBeNull();
    });
  });

  describe('getMultiplicationTableStats', () => {
    it('returns correct statistics', () => {
      saveUser('testuser');
      updateMultiplicationTable(2, 'testuser');
      updateMultiplicationTable(2, 'testuser');
      updateMultiplicationTable(5, 'testuser');
      updateMultiplicationTable(10, 'testuser');

      const stats = getMultiplicationTableStats('testuser');

      expect(stats.totalCompletions).toBe(4);
      expect(stats.uniqueTables).toBe(3);
      expect(stats.tables).toEqual({ '2': 2, '5': 1, '10': 1 });
    });

    it('returns empty stats for non-existent user', () => {
      const stats = getMultiplicationTableStats('nonexistent');

      expect(stats.totalCompletions).toBe(0);
      expect(stats.uniqueTables).toBe(0);
      expect(stats.tables).toEqual({});
    });
  });

  describe('getAllUsers', () => {
    it('returns empty array when no users exist', () => {
      expect(getAllUsers()).toEqual([]);
    });

    it('returns all users', () => {
      saveUser('user1');
      saveUser('user2');
      saveUser('user3');

      const users = getAllUsers();
      expect(users).toHaveLength(3);
      expect(users.map(u => u.username)).toContain('User1');
      expect(users.map(u => u.username)).toContain('User2');
      expect(users.map(u => u.username)).toContain('User3');
    });
  });

  describe('deleteUser', () => {
    it('removes user from storage', () => {
      saveUser('testuser');
      expect(userExists('testuser')).toBe(true);

      deleteUser('testuser');
      expect(userExists('testuser')).toBe(false);
    });

    it('normalizes username when deleting', () => {
      saveUser('testuser');
      expect(userExists('testuser')).toBe(true);

      deleteUser('TESTUSER');
      expect(userExists('testuser')).toBe(false);
    });

    it('does not error when deleting non-existent user', () => {
      expect(() => deleteUser('nonexistent')).not.toThrow();
    });
  });
});
