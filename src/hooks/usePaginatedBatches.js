import { useEffect, useState } from "react";
import { getAllByPage } from "../services/api/batchService.js";

export function usePaginatedBatches(pageSize = 20) {
    const [batches, setBatches] = useState([]);
    const [pageData, setPageData] = useState({ page: 0, totalPages: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPage = async (page = 0) => {
        setLoading(true);
        try {
            const data = await getAllByPage(pageSize, page);
            setBatches(data.content);
            setPageData({ page: data.page, totalPages: data.totalPages });
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPage(pageData.page);
    }, [pageData.page]);

    const goToPage = (newPage) => {
        setPageData((prev) => ({ ...prev, page: newPage }));
    };

    return {
        batches,
        loading,
        error,
        page: pageData.page,
        totalPages: pageData.totalPages,
        goToPage,
        refresh: () => fetchPage(pageData.page),
    };
}
