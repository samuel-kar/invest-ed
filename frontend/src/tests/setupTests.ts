import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Polyfill matchMedia for jsdom
if (!window.matchMedia) {
  ;(window as any).matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

// Mock Clerk globally to avoid requiring ClerkProvider in unit tests
vi.mock('@clerk/clerk-react', () => ({
  SignedIn: ({ children }: any) => children ?? null,
  SignedOut: ({ children }: any) => children ?? null,
  SignInButton: () => null,
  UserButton: () => null,
}))
