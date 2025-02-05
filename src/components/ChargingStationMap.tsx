import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";

// Fix for default marker icon
const DefaultIcon = L.icon({
	iconUrl: "/images/marker-icon.png",
	iconRetinaUrl: "/images/marker-icon-2x.png",
	shadowUrl: "/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Station {
	scode: string;
	pname: string;
	pcoordinate: {
		x: number;
		y: number;
	};
	pmetadata: {
		address: string;
		city: string;
		state: string;
		capacity: number;
		provider: string;
	};
	smetadata: {
		outlets: Array<{
			outletTypeCode: string;
			maxPower: number;
			maxCurrent: number;
		}>;
	};
}

const ChargingStationMap = () => {
	const [stations, setStations] = useState<Station[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchStations = async () => {
			try {
				const response = await axios.get(
					"https://mobility.api.opendatahub.com/v2/flat%2Cnode/%2A?offset=0&shownull=false&distinct=true",
				);
				setStations(response.data.data);
			} catch (error) {
				console.error("Error fetching stations:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchStations();
	}, []);

	if (loading) return <div>Loading...</div>;

	const defaultCenter: [number, number] = [47.9, 13.5];

	return (
		<MapContainer
			center={defaultCenter}
			zoom={8}
			style={{ height: "100vh", width: "100%" }}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{stations.map((station) => (
				<Marker
					key={station.scode}
					position={[station.pcoordinate.y, station.pcoordinate.x]}
				>
					<Popup>
						<div>
							<h3>{station.pname}</h3>
							<p>Address: {station.pmetadata.address}</p>
							<p>City: {station.pmetadata.city}</p>
							<p>Status: {station.pmetadata.state}</p>
							<p>Capacity: {station.pmetadata.capacity}</p>
							<p>Provider: {station.pmetadata.provider}</p>
							{station.smetadata.outlets && (
								<div>
									<p>Outlet Information:</p>
									<ul>
										{station.smetadata.outlets.map((outlet, index) => (
											<li key={index}>
												Type: {outlet.outletTypeCode}
												<br />
												Max Power: {outlet.maxPower} kW
												<br />
												Max Current: {outlet.maxCurrent} A
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
};

export default ChargingStationMap;
