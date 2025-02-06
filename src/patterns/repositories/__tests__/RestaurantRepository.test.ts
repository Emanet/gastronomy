import { RestaurantRepository } from '../RestaurantRepository';
import { ApiService } from '../../services/ApiService';

jest.mock('../../services/ApiService');

describe('RestaurantRepository', () => {
  let repository: RestaurantRepository;
  const mockApiService = {
    getInstance: jest.fn(),
    fetchRestaurants: jest.fn(),
    fetchRestaurantById: jest.fn()
  };

  beforeEach(() => {
    (ApiService.getInstance as jest.Mock).mockReturnValue(mockApiService);
    repository = RestaurantRepository.getInstance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockRestaurant = {
    Id: '1',
    Detail: {
      en: { Title: 'Test Restaurant' },
      de: { Title: 'Test Restaurant' },
      it: { Title: 'Test Restaurant' }
    },
    ContactInfos: {
      de: {
        Address: 'Test Address'
      }
    }
  };

  describe('getAll', () => {
    it('should fetch and cache restaurants', async () => {
      mockApiService.fetchRestaurants.mockResolvedValueOnce({
        Items: [mockRestaurant],
        TotalPages: 1,
        CurrentPage: 1,
        TotalResults: 1
      });

      const result = await repository.getAll();

      expect(result).toEqual({
        restaurants: [mockRestaurant],
        totalPages: 1,
        currentPage: 1,
        totalResults: 1
      });
      expect(mockApiService.fetchRestaurants).toHaveBeenCalledWith(1, 25);
    });

    it('should filter restaurants by search term', async () => {
      const mockRestaurants = [{
        ...mockRestaurant,
        Detail: {
          ...mockRestaurant.Detail,
          en: { Title: 'Pizza Restaurant' }
        }
      }, {
        ...mockRestaurant,
        Detail: {
          ...mockRestaurant.Detail,
          en: { Title: 'Burger Restaurant' }
        }
      }];

      mockApiService.fetchRestaurants.mockResolvedValueOnce({
        Items: mockRestaurants,
        TotalPages: 1,
        CurrentPage: 1,
        TotalResults: 2
      });

      const result = await repository.getAll(1, 25, 'pizza');

      expect(result.restaurants).toHaveLength(1);
      expect(result.restaurants[0].Detail.en.Title).toBe('Pizza Restaurant');
    });
  });

  describe('getById', () => {
    it('should return cached restaurant if available', async () => {
      mockApiService.fetchRestaurants.mockResolvedValueOnce({
        Items: [mockRestaurant],
        TotalPages: 1,
        CurrentPage: 1,
        TotalResults: 1
      });

      await repository.getAll(); // Cache the restaurant
      const result = await repository.getById('1');

      expect(result).toEqual(mockRestaurant);
      expect(mockApiService.fetchRestaurantById).not.toHaveBeenCalled();
    });

    it('should fetch restaurant if not in cache', async () => {
      mockApiService.fetchRestaurantById.mockResolvedValueOnce(mockRestaurant);

      const result = await repository.getById('1');

      expect(result).toEqual(mockRestaurant);
      expect(mockApiService.fetchRestaurantById).toHaveBeenCalledWith('1');
    });
  });
});