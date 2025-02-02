import type { SearchBarProps } from "@/types";
import React from "react";

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	return (
		<div className="search-bar">
			<input
				type="text"
				placeholder="Search restaurants..."
				onChange={(e) => onSearch(e.target.value)}
				className="search-input"
			/>
		</div>
	);
};

export default SearchBar;
