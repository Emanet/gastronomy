import type { Restaurant } from '../../types';

export enum RestaurantType {
    ITALIAN = 'ITALIAN',
    GERMAN = 'GERMAN',
    TURKISH = 'TURKISH'
}

interface RestaurantDetails {
    id: string;
    title: string;
    address?: string;
    email?: string;
    phoneNumber?: string;
    url?: string;
    latitude?: number;
    longitude?: number;
    altitude?: number;
}

export class RestaurantFactory {
    createRestaurant(type: RestaurantType, details: RestaurantDetails): Restaurant {
        const baseRestaurant: Restaurant = {
            Id: details.id,
            Detail: {
                de: { Title: details.title },
                en: { Title: details.title },
                it: { Title: details.title }
            },
            ContactInfos: {
                de: {
                    Address: details.address,
                    Email: details.email,
                    Phonenumber: details.phoneNumber,
                    Url: details.url
                }
            },
            GpsInfo: details.latitude && details.longitude && details.altitude ? [{
                Latitude: details.latitude,
                Longitude: details.longitude,
                Altitude: details.altitude
            }] : []
        };

        switch (type) {
            case RestaurantType.ITALIAN:
                return {
                    ...baseRestaurant,
                    Detail: {
                        ...baseRestaurant.Detail,
                        it: { Title: details.title }
                    }
                };
            case RestaurantType.GERMAN:
                return {
                    ...baseRestaurant,
                    Detail: {
                        ...baseRestaurant.Detail,
                        de: { Title: details.title }
                    }
                };
            case RestaurantType.TURKISH:
                return {
                    ...baseRestaurant,
                    Detail: {
                        ...baseRestaurant.Detail,
                        en: { Title: details.title }
                    }
                };
            default:
                throw new Error('Unknown restaurant type');
        }
    }
}