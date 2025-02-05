import type React from "react";
import { useState } from "react";
import type { SearchBarProps } from "@/types";

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		onSearch(value);
	};

	return (
		<div className="search-bar">
			<input
				type="text"
				value={searchTerm}
				placeholder="Search restaurants..."
				onChange={handleSearch}
				className="search-input"
			/>
		</div>
	);
};

export default SearchBar;
