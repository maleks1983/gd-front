function PaginationTable({page, totalPages, onPageChange}) {
    if (totalPages === 0) return null;

    const pages = Array.from({length: totalPages}, (_, i) => i);

    return (
        <div className="d-flex justify-content-center my-3 gap-2">
            <button
                className="btn btn-outline-secondary"
                disabled={page === 0}
                onClick={() => onPageChange(page - 1)}
            >
                ←
            </button>
            {pages.map((p) => (
                <button
                    key={p}
                    className={`btn ${p === page ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => onPageChange(p)}
                >
                    {p + 1}
                </button>
            ))}
            <button
                className="btn btn-outline-secondary"
                disabled={page === totalPages - 1}
                onClick={() => onPageChange(page + 1)}
            >
                →
            </button>
        </div>
    );
}

export default PaginationTable;
