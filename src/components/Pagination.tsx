import React from "react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const pageNumbers = [];
	const maxVisiblePages = 5;

	let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
	const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

	if (endPage - startPage + 1 < maxVisiblePages) {
		startPage = Math.max(1, endPage - maxVisiblePages + 1);
	}

	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="pagination">
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={() => onPageChange(1)}
				disabled={currentPage === 1}
				className="pagination-button"
			>
				&laquo;
			</button>

			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="pagination-button"
			>
				&lsaquo;
			</button>

			{pageNumbers.map((number) => (
				// biome-ignore lint/a11y/useButtonType: <explanation>
				<button
					key={number}
					onClick={() => onPageChange(number)}
					className={`pagination-button ${
						currentPage === number ? "active" : ""
					}`}
				>
					{number}
				</button>
			))}

			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="pagination-button"
			>
				&rsaquo;
			</button>

			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={() => onPageChange(totalPages)}
				disabled={currentPage === totalPages}
				className="pagination-button"
			>
				&raquo;
			</button>
		</div>
	);
};

export default Pagination;
