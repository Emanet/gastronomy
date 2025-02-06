import { calculateDistance } from '../api';

describe('api utils', () => {
  describe('calculateDistance', () => {
    it('should calculate distance between two points correctly', () => {
      // Test coordinates (Bolzano coordinates)
      const lat1 = 46.4982953;
      const lon1 = 11.3547582;
      // Merano coordinates
      const lat2 = 46.6716;
      const lon2 = 11.1571;

      const distance = calculateDistance(lat1, lon1, lat2, lon2);

      // The actual distance between Bolzano and Merano is approximately 25-30 km
      expect(distance).toBeGreaterThan(25);
      expect(distance).toBeLessThan(30);
    });

    it('should return 0 for same coordinates', () => {
      const lat = 46.4982953;
      const lon = 11.3547582;

      const distance = calculateDistance(lat, lon, lat, lon);

      expect(distance).toBe(0);
    });

    it('should handle negative coordinates', () => {
      const lat1 = -33.8688;
      const lon1 = 151.2093;
      const lat2 = -37.8136;
      const lon2 = 144.9631;

      const distance = calculateDistance(lat1, lon1, lat2, lon2);

      // Distance between Sydney and Melbourne is approximately 714 km
      expect(distance).toBeGreaterThan(700);
      expect(distance).toBeLessThan(730);
    });
  });
});