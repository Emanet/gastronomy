import React, { useEffect, useState } from "react";
import { Restaurant, RestaurantListProps } from "../types";
import { RestaurantRepository } from "../patterns/repositories/RestaurantRepository";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 25;

const RestaurantList: React.FC<RestaurantListProps> = ({
	onRestaurantClick,
}) => {
	const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalResults, setTotalResults] = useState(0);
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const restaurantRepository = RestaurantRepository.getInstance();

	const loadRestaurants = async (page: number, search: string) => {
		try {
			setLoading(true);
			const {
				restaurants: fetchedRestaurants,
				totalPages: apiTotalPages,
				currentPage: newPage,
				totalResults: total,
			} = await restaurantRepository.getAll(page, ITEMS_PER_PAGE, search);

			setRestaurants(fetchedRestaurants);
			setTotalPages(apiTotalPages);
			setCurrentPage(newPage);
			setTotalResults(total);
		} catch (error) {
			console.error("Error loading restaurants:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadRestaurants(currentPage, searchTerm);
	}, [currentPage]); // currentPage değiştiğinde yeniden yükle

	const handleSearch = (term: string) => {
		setSearchTerm(term);
		setCurrentPage(1); // Aramada ilk sayfaya dön
		loadRestaurants(1, term);
	};

	const handlePageChange = (page: number) => {
		if (page !== currentPage) {
			setCurrentPage(page);
		}
	};

	return (
		<div className="restaurant-container">
			<div className="search-container">
				<SearchBar onSearch={handleSearch} />
			</div>

			{loading ? (
				<div className="loading">Loading...</div>
			) : (
				<>
					<div className="restaurant-list">
						{restaurants.map((restaurant: Restaurant) => (
							<div
								key={restaurant.Id}
								className="restaurant-card"
								onClick={() => onRestaurantClick(restaurant)}
							>
								<img
									src={restaurant.ImageGallery?.[0]?.ImageUrl || "/image.jpg"}
									alt={restaurant.Detail.en.Title}
									className="restaurant-image"
								/>
								<h3>{restaurant.Detail.en.Title}</h3>
								{restaurant.ContactInfos?.de?.Address && (
									<p className="restaurant-address">
										{restaurant.ContactInfos.de.Address}
									</p>
								)}
							</div>
						))}
					</div>

					{restaurants.length > 0 && totalPages > 1 && (
						<div className="pagination-container">
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={handlePageChange}
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default RestaurantList;
