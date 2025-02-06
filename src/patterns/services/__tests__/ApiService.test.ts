import { ApiService } from '../ApiService';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ApiService', () => {
  let apiService: ApiService;

  beforeEach(() => {
    apiService = ApiService.getInstance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchRestaurants', () => {
    const mockResponse = {
      data: {
        Items: [
          {
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
            },
            GpsInfo: [{
              Latitude: 46.4982953,
              Longitude: 11.3547582,
              Altitude: 262.0
            }]
          }
        ],
        TotalResults: 1,
        TotalPages: 1,
        CurrentPage: 1
      }
    };

    it('should fetch restaurants successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await apiService.fetchRestaurants();

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://tourism.api.opendatahub.com/v1/ODHActivityPoi',
        expect.any(Object)
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle pagination parameters', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      await apiService.fetchRestaurants(2, 50);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://tourism.api.opendatahub.com/v1/ODHActivityPoi',
        {
          params: {
            pagesize: 50,
            pagenumber: 2,
            language: 'en',
            tagfilter: 'gastronomy',
            source: 'lts'
          },
          headers: {
            'Referer': 'testingunibz'
          }
        }
      );
    });
  });

  describe('fetchRestaurantById', () => {
    const mockRestaurant = {
      Id: '1',
      Detail: {
        en: { Title: 'Test Restaurant' },
        de: { Title: 'Test Restaurant' },
        it: { Title: 'Test Restaurant' }
      }
    };

    it('should fetch a restaurant by id successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockRestaurant });

      const result = await apiService.fetchRestaurantById('1');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://tourism.api.opendatahub.com/v1/ODHActivityPoi/1'
      );
      expect(result).toEqual(mockRestaurant);
    });

    it('should return null when restaurant is not found', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: null });

      const result = await apiService.fetchRestaurantById('999');

      expect(result).toBeNull();
    });
  });

  describe('fetchNearbyChargingStations', () => {
    const mockChargingStations = {
      data: {
        data: [{
          sactive: true,
          savailable: true,
          scode: 'TEST01',
          scoordinate: {
            x: 11.3547582,
            y: 46.4982953,
            srid: 4326
          },
          smetadata: {
            city: 'Bolzano',
            address: 'Test Address'
          },
          sname: 'Test Station',
          sorigin: 'test',
          stype: 'test'
        }]
      }
    };

    it('should fetch nearby charging stations successfully', async () => {
      mockedAxios.get.mockResolvedValueOnce(mockChargingStations);

      const result = await apiService.fetchNearbyChargingStations(
        46.4982953,
        11.3547582
      );

      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://mobility.api.opendatahub.com/v2/flat,node/EChargingStation',
        expect.any(Object)
      );
      expect(result).toEqual(mockChargingStations.data.data);
    });
  });
});