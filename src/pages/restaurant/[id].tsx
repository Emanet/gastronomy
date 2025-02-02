// src/pages/restaurant/[id].tsx
import { FC } from "react";
import { GetServerSideProps } from "next";
import { fetchRestaurantById } from "../../utils/api";
import { Restaurant } from "../../types/types";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

interface RestaurantDetailProps {
	restaurant: Restaurant | null;
}

const RestaurantDetail: FC<RestaurantDetailProps> = ({ restaurant }) => {
	const router = useRouter();

	if (!restaurant) {
		return <div className="not-found">Restaurant not found</div>;
	}

	const { Latitude, Longitude, Altitude } = restaurant.GpsInfo[0];

	return (
		<div className="restaurant-detail-container">
			<button className="back-button" onClick={() => router.back()}>
				← Back to list
			</button>

			<div className="restaurant-header">
				<h2 className="restaurant-title">{restaurant.Detail.en.Title}</h2>
			</div>

			<div className="image-gallery">
				{restaurant.ImageGallery?.map((image, index) => (
					<img
						key={index}
						src={image.ImageUrl}
						alt={restaurant.Detail.en.Title}
						className="gallery-image"
					/>
				))}
			</div>

			<div className="info-section">
				<div className="contact-info">
					<div className="address-section">
						<h3 className="section-title">Location</h3>
						<a
							href={`https://www.google.com/maps/search/?api=1&query=${Latitude},${Longitude}`}
							target="_blank"
							rel="noopener noreferrer"
							className="map-link"
						>
							Take me there
						</a>
					</div>
				</div>

				<div className="map-container">
					<Map
						latitude={Latitude}
						longitude={Longitude}
						altitude={Altitude}
						title={restaurant.Detail.en.Title}
					/>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.params!;
	const restaurant = await fetchRestaurantById(id);

	return {
		props: { restaurant },
	};
};

export default RestaurantDetail;
