import type { Restaurant } from '../../types';
import type { IRepository } from './IRepository';
import { ApiService } from '../services/ApiService';

export class RestaurantRepository implements IRepository<Restaurant> {
    private static instance: RestaurantRepository;
    private apiService: ApiService;
    private cache: Map<string, Restaurant>;

    private constructor() {
        this.apiService = ApiService.getInstance();
        this.cache = new Map();
    }

    public static getInstance(): RestaurantRepository {
        if (!RestaurantRepository.instance) {
            RestaurantRepository.instance = new RestaurantRepository();
        }
        return RestaurantRepository.instance;
    }

    async getAll(page = 1, pageSize = 25, searchTerm?: string): Promise<{
        restaurants: Restaurant[];
        totalPages: number;
        currentPage: number;
        totalResults: number;
    }> {
        try {
            const response = await this.apiService.fetchRestaurants(page, pageSize);
            let filteredRestaurants = response.Items;
            
            if (searchTerm) {
                const searchTermLower = searchTerm.toLowerCase();
                filteredRestaurants = response.Items.filter(restaurant => 
                    restaurant.Detail.en.Title.toLowerCase().includes(searchTermLower) ||
                    restaurant.ContactInfos?.de?.Address?.toLowerCase().includes(searchTermLower)
                );
            }

            // Cache the results
            // biome-ignore lint/complexity/noForEach: <explanation>
                        filteredRestaurants.forEach(restaurant => {
                this.cache.set(restaurant.Id, restaurant);
            });

            return {
                restaurants: filteredRestaurants,
                totalPages: response.TotalPages,
                currentPage: response.CurrentPage,
                totalResults: response.TotalResults
            };
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            return { 
                restaurants: [], 
                totalPages: 0, 
                currentPage: page,
                totalResults: 0
            };
        }
    }

    async getById(id: string): Promise<Restaurant | null> {
        if (this.cache.has(id)) {
            return this.cache.get(id) || null;
        }

        try {
            const restaurant = await this.apiService.fetchRestaurantById(id);
            if (restaurant) {
                this.cache.set(id, restaurant);
            }
            return restaurant;
        } catch (error) {
            console.error(`Error fetching restaurant with id ${id}:`, error);
            return null;
        }
    }

    async create(restaurant: Restaurant): Promise<void> {
        this.cache.set(restaurant.Id, restaurant);
        this.subject.notify(restaurant);
    }

    async update(restaurant: Restaurant): Promise<void> {
        this.cache.set(restaurant.Id, restaurant);
        this.subject.notify(restaurant);
    }

    async delete(id: string): Promise<void> {
        this.cache.delete(id);
    }
}