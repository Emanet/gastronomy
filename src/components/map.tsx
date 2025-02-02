// src/components/Map.tsx
import { FC } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MapProps {
	latitude: number;
	longitude: number;
	altitude: number;
	title: string;
}

const icon = new L.Icon({
	iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
	shadowSize: [41, 41],
});

const Map: FC<MapProps> = ({ latitude, longitude, altitude, title }) => {
	return (
		<MapContainer
			center={[latitude, longitude]}
			zoom={13}
			style={{ height: "400px", width: "100%" }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<Marker position={[latitude, longitude]} icon={icon}>
				<Popup>
					{title} <br /> Altitude: {altitude}m
				</Popup>
			</Marker>
		</MapContainer>
	);
};

export default Map;
