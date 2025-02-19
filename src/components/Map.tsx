import { type FC, useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { ChargingStation } from "../types";
import { fetchNearbyChargingStations, calculateDistance } from "../utils/api";
import { styled } from "styled-components";

interface MapProps {
	latitude: number;
	longitude: number;
	altitude: number;
	title: string;
}

// Styled components
const MapContainerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const NearestStationInfo = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChargingStationPopup = styled.div`
  max-width: 200px;

  h4 {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
  }

  p {
    margin: 0.25rem 0;
    color: #34495e;
  }

  ul {
    margin: 0.5rem 0;
    padding-left: 1.2rem;
    list-style-type: none;

    li {
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
    }
  }
`;

// Fix for default marker icons
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
// biome-ignore lint/performance/noDelete: <explanation>
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
	iconUrl: require("leaflet/dist/images/marker-icon.png"),
	shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const ICONS = {
	restaurant: new L.Icon({
		iconUrl: "/icons/restaurant-marker.svg",
		iconSize: [38, 38],
		iconAnchor: [19, 38],
		popupAnchor: [0, -38],
		className: "restaurant-marker",
	}),
	chargingStation: new L.Icon({
		iconUrl: "/icons/charging-station-marker.svg",
		iconSize: [38, 38],
		iconAnchor: [19, 38],
		popupAnchor: [0, -38],
		className: "charging-station-marker",
	}),
};

const MAP_STYLES = {
	height: "600px",
	width: "100%",
	borderRadius: "8px",
	boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
} as const;

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
const Map: FC<MapProps> = ({ latitude, longitude, altitude, title }) => {
	const [chargingStations, setChargingStations] = useState<ChargingStation[]>(
		[],
	);
	const [nearestStation, setNearestStation] = useState<ChargingStation | null>(
		null,
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const center = useMemo(
		() => [latitude, longitude] as [number, number],
		[latitude, longitude],
	);

	const findNearestStation = (stations: ChargingStation[]) => {
		return stations.reduce(
			(nearest, station) => {
				const distance = calculateDistance(
					latitude,
					longitude,
					station.scoordinate.y,
					station.scoordinate.x,
				);

				if (!nearest || distance < nearest.distance) {
					return { station, distance };
				}
				return nearest;
			},
			null as { station: ChargingStation; distance: number } | null,
		);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const loadChargingStations = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const stations = await fetchNearbyChargingStations(latitude, longitude);
				setChargingStations(stations);

				const nearest = findNearestStation(stations);
				if (nearest) {
					setNearestStation(nearest.station);
				}
			} catch (error) {
				console.error("Error fetching charging stations:", error);
				setError("Failed to load charging stations. Please try again later.");
			} finally {
				setIsLoading(false);
			}
		};

		void loadChargingStations();
	}, [latitude, longitude]);

	const renderNearestStationInfo = () => {
		if (isLoading)
			return <NearestStationInfo>Loading stations...</NearestStationInfo>;
		if (error)
			return <NearestStationInfo className="error">{error}</NearestStationInfo>;
		if (!nearestStation) return null;

		const distance = calculateDistance(
			latitude,
			longitude,
			nearestStation.scoordinate.y,
			nearestStation.scoordinate.x,
		).toFixed(2);

		return (
			<NearestStationInfo>
				<h3>Nearest Charging Station</h3>
				<p>
					<strong>{nearestStation.sname}</strong>
				</p>
				<p>{nearestStation.smetadata.address}</p>
				<p>Distance: {distance} km</p>
				<p>Status: {nearestStation.smetadata.state || "Unknown"}</p>
			</NearestStationInfo>
		);
	};

	const renderChargingStationPopup = (station: ChargingStation) => {
		const distance = calculateDistance(
			latitude,
			longitude,
			station.scoordinate.y,
			station.scoordinate.x,
		).toFixed(2);

		return (
			<ChargingStationPopup>
				<h4>{station.sname}</h4>
				<p>
					<strong>Address:</strong> {station.smetadata.address}
				</p>
				{station.smetadata.capacity && (
					<p>
						<strong>Capacity:</strong> {station.smetadata.capacity} vehicles
					</p>
				)}
				<p>
					<strong>Distance:</strong> {distance} km
				</p>
				<p>
					<strong>Provider:</strong>{" "}
					{station.smetadata.provider || station.sorigin}
				</p>
				<p>
					<strong>Status:</strong>{" "}
					{station.smetadata.state || (station.sactive ? "Active" : "Inactive")}
				</p>
				{station.smetadata.accessType && (
					<p>
						<strong>Access:</strong> {station.smetadata.accessType}
					</p>
				)}
			</ChargingStationPopup>
		);
	};

	return (
		<MapContainerWrapper>
			<MapContainer
				center={center}
				zoom={13}
				style={MAP_STYLES}
				scrollWheelZoom={true}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>

				{/* Restaurant Marker */}
				<Marker position={center} icon={ICONS.restaurant}>
					<Popup>
						<strong>{title}</strong>
						<br />
						Altitude: {altitude}m
					</Popup>
				</Marker>

				{/* Charging Station Markers */}
				{!isLoading &&
					chargingStations.map((station) => (
						<Marker
							key={station.scode}
							position={[station.scoordinate.y, station.scoordinate.x]}
							icon={ICONS.chargingStation}
						>
							<Popup>{renderChargingStationPopup(station)}</Popup>
						</Marker>
					))}
			</MapContainer>

			{renderNearestStationInfo()}
		</MapContainerWrapper>
	);
};

export default Map;
