import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

// Estender matchers do Vitest
expect.extend(matchers)

// Limpar após cada teste
afterEach(() => {
  cleanup()
}) 