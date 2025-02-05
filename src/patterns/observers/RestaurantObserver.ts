import type { Restaurant } from '../../types';

export interface Observer {
    update(restaurant: Restaurant): void;
}

export interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(restaurant: Restaurant): void;
}

export class RestaurantSubject implements Subject {
    private observers: Observer[] = [];
    
    attach(observer: Observer): void {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }
    
    detach(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }
    
    notify(restaurant: Restaurant): void {
        for (const observer of this.observers) {
            observer.update(restaurant);
        }
    }
}

export class RestaurantUpdateObserver implements Observer {
    update(restaurant: Restaurant): void {
        console.log(`Restaurant ${restaurant.Detail.en.Title} has been updated!`);
    }
}