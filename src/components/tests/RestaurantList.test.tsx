import RestaurantList from "../RestaurantList";

const mockRestaurants = [
	{
		Id: "1",
		Detail: {
			de: { Title: "Test Restaurant 1" },
			en: { Title: "Test Restaurant 1" },
			it: { Title: "Test Restaurant 1" },
		},
		ImageGallery: [
			{ ImageUrl: "test.jpg", ImageDesc: { de: "", en: "", it: "" } },
		],
		ContactInfos: { de: {} },
		GpsInfo: [{ Latitude: 0, Longitude: 0, Altitude: 0 }],
	},
];

describe("RestaurantList", () => {
	it("should render restaurant cards", () => {
		const mockOnClick = jest.fn();
		render(
			<RestaurantList
				restaurants={mockRestaurants}
				onRestaurantClick={mockOnClick}
			/>,
		);

		expect(screen.getByText("Test Restaurant 1")).toBeInTheDocument();
	});

	it("should call onRestaurantClick when clicking a restaurant", () => {
		const mockOnClick = jest.fn();
		render(
			<RestaurantList
				restaurants={mockRestaurants}
				onRestaurantClick={mockOnClick}
			/>,
		);

		fireEvent.click(screen.getByText("Test Restaurant 1"));
		expect(mockOnClick).toHaveBeenCalledWith(mockRestaurants[0]);
	});
});
