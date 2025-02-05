import type React from "react";

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
	return (
		<div
			style={{ marginBottom: "0", paddingBottom: "1em" }}
			className="pagination"
		>
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="pagination-button"
			>
				Previous
			</button>

			<span className="pagination-info">
				Page {currentPage} of {totalPages}
			</span>

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="pagination-button"
			>
				Next
			</button>

			<style jsx>{`
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }

        .pagination-button {
          padding: 0.5rem 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: white;
          cursor: pointer;
          font-size: 1rem;
        }

        .pagination-button:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .pagination-button:not(:disabled):hover {
          background: #f5f5f5;
        }

        .pagination-info {
          font-size: 1rem;
        }
      `}</style>
		</div>
	);
};

export default Pagination;
