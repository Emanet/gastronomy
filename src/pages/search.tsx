import { useRouter } from "next/router";
import RestaurantList from "../components/RestaurantList";
import Navbar from "../components/NavBar";
import { Restaurant } from "../types";

const SearchPage = () => {
	const router = useRouter();

	const handleRestaurantClick = (restaurant: Restaurant) => {
		router.push(`/restaurant/${restaurant.Id}`);
	};

	return (
		<div className="search-page">
			<Navbar />
			<div className="container">
				<h1>Find Your Restaurant</h1>
				<RestaurantList
					onRestaurantClick={handleRestaurantClick}
					restaurants={[]}
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
            `}</style>
		</div>
	);
};

export default SearchPage;
