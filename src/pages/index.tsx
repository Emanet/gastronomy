// src/pages/index.tsx
import { FC, useEffect, useState } from "react";
import { fetchRestaurants } from "../utils/api";
import SearchBar from "../components/SearchBar";
import RestaurantList from "../components/RestaurantList";
import { useRouter } from "next/router";
import { Restaurant } from "../types/types";

const Home: FC = () => {
	const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
	const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
		[],
	);
	const router = useRouter();

	useEffect(() => {
		const getRestaurants = async () => {
			const data = await fetchRestaurants();
			setRestaurants(data);
			setFilteredRestaurants(data);
		};
		getRestaurants();
	}, []);

	const handleSearch = (searchTerm: string) => {
		const filtered = restaurants.filter((restaurant) =>
			restaurant.Detail.en.Title.toLowerCase().includes(
				searchTerm.toLowerCase(),
			),
		);
		setFilteredRestaurants(filtered);
	};

	const handleRestaurantClick = (restaurant: Restaurant) => {
		router.push(`/restaurant/${restaurant.Id}`);
	};

	return (
		<div>
			<SearchBar onSearch={handleSearch} />
			<RestaurantList
				restaurants={filteredRestaurants}
				onRestaurantClick={handleRestaurantClick}
			/>
		</div>
	);
};

export default Home;
