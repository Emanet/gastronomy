import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SearchBar from "../components/SearchBar";
import RestaurantList from "../components/RestaurantList";
import Pagination from "../components/pagination";
import type { Restaurant } from "../types";
import { fetchRestaurants } from "../utils/api";
import Navbar from "../components/NavBar";

const ITEMS_PER_PAGE = 12;

const SearchPage = () => {
	const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
	const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
		[],
	);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalItems, setTotalItems] = useState(0);
	const router = useRouter();

	useEffect(() => {
		const loadRestaurants = async () => {
			try {
				const data = await fetchRestaurants(currentPage, ITEMS_PER_PAGE);
				setRestaurants(data);
				setFilteredRestaurants(data);
				// Note: In a real application, the total count should come from the API
				setTotalItems(data.length * 5); // Temporary solution - assuming 5 pages of data
			} catch (error) {
				console.error("Error fetching restaurants:", error);
			} finally {
				setLoading(false);
			}
		};

		loadRestaurants();
	}, [currentPage]);

	const handleSearch = (searchTerm: string) => {
		const filtered = restaurants.filter((restaurant) =>
			restaurant.Detail.en.Title.toLowerCase().includes(
				searchTerm.toLowerCase(),
			),
		);
		setFilteredRestaurants(filtered);
		setCurrentPage(1); // Reset to first page when searching
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo(0, 0); // Scroll to top when changing page
	};

	const handleRestaurantClick = (restaurant: Restaurant) => {
		router.push(`/restaurant/${restaurant.Id}`);
	};

	if (loading) {
		return <div className="loading">Loading...</div>;
	}

	const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

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
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			</div>

			<style jsx>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
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
