import dynamic from "next/dynamic";
import type { NextPage } from "next";

const ChargingStationMap = dynamic(
	() => import("../components/ChargingStationMap"),
	{
		ssr: false,
		loading: () => <div>Loading map...</div>,
	},
);

const MapPage: NextPage = () => {
	return (
		<div style={{ height: "100vh", width: "100%" }}>
			<ChargingStationMap />
		</div>
	);
};

export default MapPage;
