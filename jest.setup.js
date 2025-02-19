import '@testing-library/jest-dom'

// Mock the Leaflet library since it requires browser APIs
jest.mock('leaflet', () => ({
  map: jest.fn(),
  marker: jest.fn(),
  tileLayer: jest.fn(),
}))