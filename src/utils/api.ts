/* import axios from 'axios';
import type { Restaurant, ChargingStation } from '../types';

const TOURISM_API_URL = 'https://tourism.api.opendatahub.com/v1/ODHActivityPoi';
const MOBILITY_API_URL = 'https://mobility.api.opendatahub.com/v2';

export const fetchRestaurants = async (page = 1, pageSize = 25): Promise<Restaurant[]> => {
  const response = await axios.get(TOURISM_API_URL, {
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
  return response.data.Items;
};

export const fetchRestaurantById = async (id: string): Promise<Restaurant | null> => {
  const response = await axios.get(`${TOURISM_API_URL}/${id}`);
  return response.data || null;
};

export const fetchNearbyChargingStations = async (
  latitude: number,
  longitude: number,
  radius = 10000
): Promise<ChargingStation[]> => {
  const response = await axios.get(
    `${MOBILITY_API_URL}/flat,node/EChargingStation`,
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

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}; */