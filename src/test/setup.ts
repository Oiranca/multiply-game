import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

const storage: Record<string, string> = {};

const localStorageMock = {
  getItem: (key: string): string | null => {
    return storage[key] || null;
  },
  setItem: (key: string, value: string): void => {
    storage[key] = value;
  },
  removeItem: (key: string): void => {
    delete storage[key];
  },
  clear: (): void => {
    Object.keys(storage).forEach(key => delete storage[key]);
  },
  get length(): number {
    return Object.keys(storage).length;
  },
  key: (index: number): string | null => {
    const keys = Object.keys(storage);
    return keys[index] || null;
  }
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true
});
