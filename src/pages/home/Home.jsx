import TableReport from "../../components/TableReport/TableReport.jsx";
import { initialBatch } from "../../constants/InitialBatch.js";
import AddBatchModal from "../../components/AddBatchModal/AddBatchModal.jsx";
import BatchDetails from "../../components/BatchDetails/BatchDetails.jsx";
import * as batchService from "../../services/api/batchService.js";
import { usePaginatedBatches } from "../../hooks/usePaginatedBatches.js";
import { useState } from "react";

import PaginationTable from "../../components/TableReport/PaginationTable.jsx";
import { useOutletContext } from "react-router-dom";

function Home() {
    const [filterText, setFilterText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [newBatch, setNewBatch] = useState(initialBatch);

    const { selectedBatch = null, setSelectedBatch } = useOutletContext();

    const sizePage = 20;

    const {
        batches,
        loading,
        error,
        page,
        totalPages,
        goToPage,
        refresh,
    } = usePaginatedBatches(sizePage);

    const filteredData = batches.filter(item =>
        Object.values(item).join(" ").toLowerCase().includes(filterText.toLowerCase())
    );

    const handleAddBatchSubmit = async (e) => {
        e.preventDefault();
        try {
            await batchService.createBatchService(newBatch);
            await refresh();
            setShowModal(false);
            setNewBatch(initialBatch);
        } catch (e) {
            console.error("Помилка при додаванні партії:", e);
        }
    };

    const handleDelete = async (batchToDelete) => {
        try {
            await batchService.deleteBatchService(batchToDelete.id);
            await refresh();
            setFilterText("");
        } catch (e) {
            console.error("Помилка при видаленні:", e);
        }
    };

    const handleUpdateBatch = async (updatedBatch) => {
        try {
            await batchService.updateBatchService(updatedBatch);
            await refresh();
            setSelectedBatch(null);
        } catch (e) {
            console.error("Помилка при оновленні партії:", e);
        }
    };

    const dataToShow = selectedBatch ? [selectedBatch] : filteredData;

    return (
        <>
            <div className="h-100 w-100">

                <AddBatchModal
                    show={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setNewBatch(initialBatch);
                    }}
                    onSubmit={handleAddBatchSubmit}
                    batch={newBatch}
                    setBatch={setNewBatch}
                />

                <div className="container d-flex flex-column h-100">

                    {selectedBatch ? (
                        <BatchDetails
                            batch={selectedBatch}
                            setBatch={setSelectedBatch}
                            onUpdateBatch={handleUpdateBatch}
                            onBack={() => setSelectedBatch(null)}
                        />
                    ) : (
                        <>


                            <div className="flex-grow-1 flex-fill">
                                {loading ? (
                                    <p className="text-center">Завантаження...</p>
                                ) : (
                                    <TableReport
                                        filterText={filterText}
                                        setFilterText={setFilterText}
                                        filteredData={dataToShow}
                                        onRowClick={(batch) => setSelectedBatch({ ...batch })}
                                        onDeleteBatch={handleDelete}
                                    />
                                )}

                                {!selectedBatch && (
                                    <PaginationTable
                                        page={page}
                                        totalPages={totalPages}
                                        onPageChange={goToPage}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Home;
