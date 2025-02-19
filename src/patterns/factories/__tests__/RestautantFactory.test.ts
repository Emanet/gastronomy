import { RestaurantFactory, RestaurantType } from '../RestaurantFactory';

describe('RestaurantFactory', () => {
  let factory: RestaurantFactory;

  beforeEach(() => {
    factory = new RestaurantFactory();
  });

  const baseDetails = {
    id: '1',
    title: 'Test Restaurant',
    address: 'Test Address',
    email: 'test@example.com',
    phoneNumber: '+1234567890',
    url: 'http://example.com',
    latitude: 46.4982953,
    longitude: 11.3547582,
    altitude: 262.0
  };

  it('should create an Italian restaurant', () => {
    const restaurant = factory.createRestaurant(RestaurantType.ITALIAN, baseDetails);

    expect(restaurant).toEqual({
      Id: '1',
      Detail: {
        de: { Title: 'Test Restaurant' },
        en: { Title: 'Test Restaurant' },
        it: { Title: 'Test Restaurant' }
      },
      ContactInfos: {
        de: {
          Address: 'Test Address',
          Email: 'test@example.com',
          Phonenumber: '+1234567890',
          Url: 'http://example.com'
        }
      },
      GpsInfo: [{
        Latitude: 46.4982953,
        Longitude: 11.3547582,
        Altitude: 262.0
      }]
    });
  });

  it('should create a German restaurant', () => {
    const restaurant = factory.createRestaurant(RestaurantType.GERMAN, baseDetails);
    expect(restaurant.Detail.de.Title).toBe('Test Restaurant');
  });

  it('should create a Turkish restaurant', () => {
    const restaurant = factory.createRestaurant(RestaurantType.TURKISH, baseDetails);
    expect(restaurant.Detail.en.Title).toBe('Test Restaurant');
  });

  it('should handle missing GPS information', () => {
    const detailsWithoutGPS = {
      ...baseDetails,
      latitude: undefined,
      longitude: undefined,
      altitude: undefined
    };

    const restaurant = factory.createRestaurant(RestaurantType.ITALIAN, detailsWithoutGPS);
    expect(restaurant.GpsInfo).toEqual([]);
  });

  it('should throw error for unknown restaurant type', () => {
    expect(() => {
      factory.createRestaurant('UNKNOWN' as RestaurantType, baseDetails);
    }).toThrow('Unknown restaurant type');
  });
});