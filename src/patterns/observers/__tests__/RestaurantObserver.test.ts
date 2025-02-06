import { RestaurantSubject, RestaurantUpdateObserver } from '../RestaurantObserver';
import type { Restaurant } from '../../../types';

describe('RestaurantObserver', () => {
  let subject: RestaurantSubject;
  let observer1: RestaurantUpdateObserver;
  let observer2: RestaurantUpdateObserver;

  beforeEach(() => {
    subject = new RestaurantSubject();
    observer1 = new RestaurantUpdateObserver();
    observer2 = new RestaurantUpdateObserver();

    // Spy on console.log
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockRestaurant: Restaurant = {
    Id: '1',
    Detail: {
      en: { Title: 'Test Restaurant' },
      de: { Title: 'Test Restaurant' },
      it: { Title: 'Test Restaurant' }
    },
    ContactInfos: {
      de: {}
    },
    GpsInfo: []
  };

  it('should attach observers', () => {
    subject.attach(observer1);
    subject.attach(observer2);

    subject.notify(mockRestaurant);

    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenCalledWith(
      'Restaurant Test Restaurant has been updated!'
    );
  });

  it('should not attach the same observer twice', () => {
    subject.attach(observer1);
    subject.attach(observer1);

    subject.notify(mockRestaurant);

    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it('should detach observers', () => {
    subject.attach(observer1);
    subject.attach(observer2);
    subject.detach(observer1);

    subject.notify(mockRestaurant);

    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it('should handle detaching non-existent observer', () => {
    subject.attach(observer1);
    subject.detach(observer2);

    subject.notify(mockRestaurant);

    expect(console.log).toHaveBeenCalledTimes(1);
  });
});