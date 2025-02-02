// src/utils/api.ts
import type { Restaurant } from '@/types';
import axios from 'axios';

const API_URL = 'https://tourism.api.opendatahub.com/v1/ODHActivityPoi?tagfilter=gastronomy&source=lts';

export const fetchRestaurants = async (): Promise<Restaurant[]> => {
  const response = await axios.get(API_URL);
  return response.data.Items;
};