// src/components/Map.tsx
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
`;

const NearestStationInfo = styled.div`
    margin-top: 1rem;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 4px;
`;

const ChargingStationPopup = styled.div`
    max-width: 200px;

    h4 {
        margin: 0 0 0.5rem 0;
    }

    p {
        margin: 0.25rem 0;
    }

    ul {
        margin: 0.5rem 0;
        padding-left: 1.2rem;
    }
`;

// Constants
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
	height: "400px",
	width: "100%",
} as const;

const Map: FC<MapProps> = ({ latitude, longitude, altitude, title }) => {
	const [chargingStations, setChargingStations] = useState<ChargingStation[]>(
		[],
	);
	const [nearestStation, setNearestStation] = useState<ChargingStation | null>(
		null,
	);

	// Memoize the center position
	const center = useMemo(
		() => [latitude, longitude] as [number, number],
		[latitude, longitude],
	);

	// Find nearest station
	const findNearestStation = (stations: ChargingStation[]) => {
		return stations.reduce(
			(nearest, station) => {
				const distance = calculateDistance(
					latitude,
					longitude,
					station.pcoordinate.y,
					station.pcoordinate.x,
				);

				if (!nearest || distance < nearest.distance) {
					return { station, distance };
				}
				return nearest;
			},
			null as { station: ChargingStation; distance: number } | null,
		);
	};

	useEffect(() => {
		const loadChargingStations = async () => {
			try {
				const stations = await fetchNearbyChargingStations();
				setChargingStations(stations);

				const nearest = findNearestStation(stations);
				if (nearest) {
					setNearestStation(nearest.station);
				}
			} catch (error) {
				console.error("Error fetching charging stations:", error);
			}
		};

		void loadChargingStations();
	}, [latitude, longitude]);

	const renderNearestStationInfo = () => {
		if (!nearestStation) return null;

		const distance = calculateDistance(
			latitude,
			longitude,
			nearestStation.pcoordinate.y,
			nearestStation.pcoordinate.x,
		).toFixed(2);

		return (
			<NearestStationInfo>
				<h3>Nearest Charging Station</h3>
				<p>{nearestStation.pname}</p>
				<p>{nearestStation.pmetadata.address}</p>
				<p>Distance: {distance} km</p>
			</NearestStationInfo>
		);
	};

	const renderChargingStationPopup = (station: ChargingStation) => {
		const distance = calculateDistance(
			latitude,
			longitude,
			station.pcoordinate.y,
			station.pcoordinate.x,
		).toFixed(2);

		return (
			<ChargingStationPopup>
				<h4>{station.pname}</h4>
				<p>Address: {station.pmetadata.address}</p>
				<p>Capacity: {station.pmetadata.capacity} vehicles</p>
				<p>Distance: {distance} km</p>
				<p>Available Outlets:</p>
				<ul>
					{station.smetadata.outlets.map((outlet, index) => (
						<li key={index}>
							Type: {outlet.outletTypeCode} - Max Power: {outlet.maxPower}kW
						</li>
					))}
				</ul>
			</ChargingStationPopup>
		);
	};

	return (
		<MapContainerWrapper>
			<MapContainer center={center} zoom={13} style={MAP_STYLES}>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>

				<Marker position={center} icon={ICONS.restaurant}>
					<Popup>
						{title} <br /> Altitude: {altitude}m
					</Popup>
				</Marker>

				{nearestStation && (
					<Marker
						position={[
							nearestStation.pcoordinate.y,
							nearestStation.pcoordinate.x,
						]}
						icon={ICONS.chargingStation}
					>
						<Popup>{renderChargingStationPopup(nearestStation)}</Popup>
					</Marker>
				)}
			</MapContainer>

			{renderNearestStationInfo()}
		</MapContainerWrapper>
	);
};

export default Map;
