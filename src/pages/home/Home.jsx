import TableReport from "../../components/TableReport/TableReport.jsx";
import {initialBatch} from "../../constants/initialBatch.js";
import AddBatchModal from "../../components/AddBatchModal/AddBatchModal.jsx";
import BatchDetails from "../../components/BatchDetails/BatchDetails.jsx";
import {deleteBatchService, getBatchByProductSerial} from "../../services/api/batchService.js";
import {usePaginatedBatches} from "../../hooks/usePaginatedBatches.js";
import {useState} from "react";
import {useUser} from "../../hooks/useUser.js";
import PaginationTable from "../../components/TableReport/PaginationTable.jsx";

function Home() {
    const {user} = useUser();
    const [filterText, setFilterText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [newBatch, setNewBatch] = useState(initialBatch);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [searchSerial, setSearchSerial] = useState("");

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
            await fetch("/api/batch", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newBatch),
            });
            await refresh();
            setShowModal(false);
            setNewBatch(initialBatch);
        } catch (e) {
            console.error("Помилка при додаванні партії:", e);
        }
    };

    const handleSerialSearch = async () => {
        if (!searchSerial) return;
        try {
            const batch = await getBatchByProductSerial(searchSerial);
            setSelectedBatch(batch); // Або setFilteredBatches([batch])
            setFilterText("");
        } catch (e) {
            console.error("Не знайдено партію:", e);
        }
    };

    const handleDelete = async (batchToDelete) => {
        try {
            await deleteBatchService(batchToDelete.id);
            await refresh();
            setFilterText("");
        } catch (e) {
            console.error("Помилка при видаленні:", e);
        }
    };

    const handleUpdateBatch = async (updatedBatch) => {
        try {
            await fetch(`/api/batch/${updatedBatch.id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updatedBatch),
            });
            await refresh();
            setSelectedBatch(null);
        } catch (e) {
            console.error("Помилка при оновленні партії:", e);
        }
    };

    const handleClearSearch = async () => {
        setSearchSerial("");
        setSelectedBatch(null);
        await refresh();
    };

    return (
        <div className="h-100 w-100">
            <div className="container d-flex flex-column h-100">
                <div className="d-flex flex-column align-items-center">
                    <h2>id: {user?.id}</h2>
                    <h3>Вітаю, {user?.name}</h3>
                    <p>Телефон: +380{user?.tel}</p>
                </div>

                {selectedBatch ? (
                    <BatchDetails
                        batch={selectedBatch}
                        setBatch={setSelectedBatch}
                        onUpdateBatch={handleUpdateBatch}
                        onBack={() => setSelectedBatch(null)}
                    />
                ) : (
                    <>
                        <div className="d-flex flex-column align-items-center mb-3">
                            <button
                                className="btn btn-primary w-100"
                                onClick={() => setShowModal(true)}
                            >
                                Додати партію
                            </button>
                        </div>

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

                        <div className="flex-grow-1 flex-fill">
                            <h3 className="text-center pt-3">Виконання за день</h3>
                            {loading ? (
                                <p className="text-center">Завантаження...</p>
                            ) : (
                                <TableReport
                                    filterText={filterText}
                                    setFilterText={setFilterText}
                                    filteredData={filteredData}
                                    onRowClick={batch => setSelectedBatch({...batch})}
                                    searchSerial={searchSerial}
                                    setSearchSerial={setSearchSerial}
                                    handleSerialSearch={handleSerialSearch}
                                    handleClearSearch={handleClearSearch}
                                    onDeleteBatch={handleDelete}
                                />
                            )}

                            <PaginationTable
                                page={page}
                                totalPages={totalPages}
                                onPageChange={goToPage}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
