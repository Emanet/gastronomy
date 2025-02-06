import axios from 'axios';
import type { Restaurant, ChargingStation, ParkingStation } from '../../types';


interface ApiResponse {
    Items: Restaurant[];
    TotalResults: number;
    TotalPages: number;
    CurrentPage: number;
}
// API Service Singleton Pattern
export class ApiService {
    private static instance: ApiService;
    private readonly TOURISM_API_URL = 'https://tourism.api.opendatahub.com/v1/ODHActivityPoi';
    private readonly MOBILITY_API_URL = 'https://mobility.api.opendatahub.com/v2';

    private constructor() {}

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    async fetchRestaurants(page = 1, pageSize = 25): Promise<ApiResponse> {
        const response = await axios.get<ApiResponse>(this.TOURISM_API_URL, {
            params: {
                pagesize: pageSize,
                pagenumber: page,
                language: 'en',
                tagfilter: 'gastronomy',
                source: 'lts'
            },
            headers: {
                'Referer': 'testingunibz'
            }
        });
        return response.data;
    }

    async fetchRestaurantById(id: string): Promise<Restaurant | null> {
        const response = await axios.get(`${this.TOURISM_API_URL}/${id}`);
        return response.data || null;
    }

    async fetchNearbyChargingStations(
        latitude: number,
        longitude: number,
        radius = 10000
    ): Promise<ChargingStation[]> {
        const response = await axios.get(
            `${this.MOBILITY_API_URL}/flat,node/EChargingStation`,
            {
                params: {
                    where: `scoordinate.dlt.(${radius},${longitude},${latitude})`,
                    limit: 200,
                    offset: 0,
                    shownull: false,
                    distinct: true
                },
                headers: {
                    'Referer': 'testingunibz'
                }
            }
        );
        return response.data.data;
    }

    async fetchNearbyParkingStations(
        latitude: number,
        longitude: number,
        radius = 10000
    ): Promise<ParkingStation[]> {
        const response = await axios.get(
          `${this.MOBILITY_API_URL}/flat,node/ParkingStation`,
          {
            params: {
              where: `scoordinate.dlt.(${radius},${longitude},${latitude})`,
              limit: 200,
              offset: 0,
              shownull: false,
              distinct: true
            },
            headers: {
              'Referer': 'testingunibz'
            }
          }
        );
        return response.data.data;
      };
}