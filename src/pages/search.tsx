// src/pages/search.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SearchBar from "../components/SearchBar";
import RestaurantList from "../components/RestaurantList";
import { Restaurant } from "../types/types";
import { fetchRestaurants } from "../utils/api";
import Navbar from "../components/NavBar";

const SearchPage = () => {
	const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
	const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
		[],
	);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const loadRestaurants = async () => {
			try {
				const data = await fetchRestaurants();
				setRestaurants(data);
				setFilteredRestaurants(data);
			} catch (error) {
				console.error("Error fetching restaurants:", error);
			} finally {
				setLoading(false);
			}
		};

		loadRestaurants();
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

	if (loading) {
		return <div className="loading">Loading...</div>;
	}

	return (
		<div className="search-page">
			<Navbar />
			<div className="container">
				<h1>Find Your Restaurant</h1>
				<SearchBar onSearch={handleSearch} />
				<RestaurantList
					restaurants={filteredRestaurants}
					onRestaurantClick={handleRestaurantClick}
				/>
			</div>

			<style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        h1 {
          text-align: center;
          margin-bottom: 2rem;
        }
        .loading {
          text-align: center;
          padding: 2rem;
          font-size: 1.2rem;
        }
      `}</style>
		</div>
	);
};

export default SearchPage;
