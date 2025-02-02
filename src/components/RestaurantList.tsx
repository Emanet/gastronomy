// src/components/RestaurantList.tsx
import React from "react";
import { Restaurant, RestaurantListProps } from "../types/types";

const RestaurantList: React.FC<RestaurantListProps> = ({
	restaurants,
	onRestaurantClick,
}) => {
	return (
		<div className="restaurant-list">
			{restaurants.map((restaurant: Restaurant) => (
				<div
					key={restaurant.Id}
					className="restaurant-card"
					onClick={() => onRestaurantClick(restaurant)}
				>
					{restaurant.ImageGallery?.[0] && (
						<img
							src={restaurant.ImageGallery[0].ImageUrl}
							alt={restaurant.Detail.en.Title}
							className="restaurant-image"
						/>
					)}
					<h3>{restaurant.Detail.en.Title}</h3>
				</div>
			))}
		</div>
	);
};

export default RestaurantList;
