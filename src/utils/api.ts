// src/utils/api.ts
import axios from 'axios';
import { Restaurant } from '../types/types';

const API_URL = 'https://tourism.api.opendatahub.com/v1/ODHActivityPoi';

export const fetchRestaurants = async (page = 1, pageSize = 25): Promise<Restaurant[]> => {
  const response = await axios.get(API_URL, {
    params: {
      pagesize: pageSize,
      pagenumber: page,
      language: 'en',
      tagfilter: 'gastronomy',
      source: 'lts'
    }
  });
  return response.data.Items;
};

export const fetchRestaurantById = async (id: string): Promise<Restaurant | null> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data || null;
};