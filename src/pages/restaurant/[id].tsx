// src/pages/restaurant/[id].tsx
import { FC } from "react";
import { GetServerSideProps } from "next";
import { fetchRestaurants } from "../../utils/api";
import { Restaurant } from "../../types/types";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Dinamik olarak Map bileşenini yükleyin, böylece server-side rendering sırasında Leaflet hatası almazsınız.
const Map = dynamic(() => import("../../components/Map"), { ssr: false });

interface RestaurantDetailProps {
	restaurant: Restaurant | null;
}

const RestaurantDetail: FC<RestaurantDetailProps> = ({ restaurant }) => {
	const router = useRouter();

	if (!restaurant) {
		return <div>Restaurant not found</div>;
	}

	const { Latitude, Longitude, Altitude } = restaurant.GpsInfo[0];

	return (
		<div>
			<button onClick={() => router.back()}>Back to list</button>
			<h2>{restaurant.Detail.en.Title}</h2>
			{restaurant.ImageGallery?.map((image, index) => (
				<img
					key={index}
					src={image.ImageUrl}
					alt={restaurant.Detail.en.Title}
					style={{ maxWidth: "100%", height: "auto", marginBottom: "1rem" }}
				/>
			))}
			<div className="contact-info">
				<p>
					Address:{" "}
					<a
						href={`https://www.google.com/maps/search/?api=1&query=${Latitude},${Longitude}`}
						target="_blank"
						rel="noopener noreferrer"
					>
						Take me there
					</a>
				</p>
				<p>Email: {restaurant.ContactInfos.de.Email}</p>
				<p>Phone: {restaurant.ContactInfos.de.Phonenumber}</p>
				<p>
					Website:{" "}
					<a
						href={restaurant.ContactInfos.de.Url}
						target="_blank"
						rel="noopener noreferrer"
					>
						{restaurant.ContactInfos.de.Url}
					</a>
				</p>
			</div>
			<Map
				latitude={Latitude}
				longitude={Longitude}
				altitude={Altitude}
				title={restaurant.Detail.en.Title}
			/>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.params!;
	const restaurants = await fetchRestaurants();
	const restaurant = restaurants.find((rest) => rest.Id === id) || null;

	return {
		props: { restaurant },
	};
};

export default RestaurantDetail;
