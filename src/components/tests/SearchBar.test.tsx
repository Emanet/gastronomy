import { describe } from "node:test";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
	it("should render search input", () => {
		const mockOnSearch = jest.fn();
		render(<SearchBar onSearch={mockOnSearch} />);

		const searchInput = screen.getByPlaceholderText("Search restaurants...");
		expect(searchInput).toBeInTheDocument();
	});

	it("should call onSearch when input changes", () => {
		const mockOnSearch = jest.fn();
		render(<SearchBar onSearch={mockOnSearch} />);

		const searchInput = screen.getByPlaceholderText("Search restaurants...");
		fireEvent.change(searchInput, { target: { value: "test" } });

		expect(mockOnSearch).toHaveBeenCalledWith("test");
	});
});
