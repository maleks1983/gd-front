import TableReport from "../../components/TableReport/TableReport.jsx";
import BatchDetails from "../../components/batch/batchDetails/BatchDetails.jsx";
import * as batchService from "../../services/api/batchService.js";
import {usePaginatedBatches} from "../../hooks/usePaginatedBatches.js";
import {useState} from "react";

import PaginationTable from "../../components/TableReport/PaginationTable.jsx";
import {useOutletContext} from "react-router-dom";
import AddBatchModal from "../../components/batch/addBatchModal/AddBatchModal.jsx";
import {useBatchUI} from "../../hooks/useBatchUI.js";
import DeleteBatchModal from "../../components/batch/deleteBatchModal/DeleteBatchModal.jsx";
import UpdateBatchModal from "../../components/batch/updateBatchModal/UpdateBatchModal.jsx";
import DeleteProductModal from "../../components/product/deleteProductModal/DeleteProductModal.jsx";
import UpdateProductModal from "../../components/product/updateProductModal/UpdateProductModal.jsx";
import AddProductModal from "../../components/product/addProductModal/AddProductModal.jsx";


function Home() {
    const [filterText, setFilterText] = useState("");
    const {selectedBatch = null, setSelectedBatch} = useOutletContext();
    const {showDeleteModal, closeDeleteModal} = useBatchUI();
    const {showAddModal, closeAddModal, openAddModal} = useBatchUI();
    const {showUpdateModal, closeUpdateModal} = useBatchUI();
    const {showDeleteProductModal, closeDeleteProductModal} = useBatchUI();
    const {showAddProductModal, closeAddProductModal} = useBatchUI();
    const {showUpdateProductModal, closeUpdateProductModal} = useBatchUI();
    const [preloadedBatch, setPreloadedBatch] = useState(null);


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
    const dataToShow = selectedBatch ? [selectedBatch] : filteredData;


    const handleUpdateBatch = async (updatedBatch) => {
        try {
            await batchService.updateBatch(updatedBatch);
            await refresh();
            setSelectedBatch(null);
        } catch (e) {
            console.error("Помилка при оновленні партії:", e);
        }
    };


    return (
        <>
            <div className="h-100 w-100">
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
                                        onRowClick={(batch) => setSelectedBatch({...batch})}

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
            <AddBatchModal
                initialBatchData={preloadedBatch}
                setPreloadedBatch={setPreloadedBatch}
                show={showAddModal}
                onClose={() => {
                    setPreloadedBatch(null);
                    closeAddModal();
                }}
                onRefresh={refresh}
            />
            <AddProductModal
                show={showAddProductModal}
                onClose={() => {
                    setPreloadedBatch(null);
                    closeAddProductModal();
                }}
                onRefresh={refresh}
            />

            <UpdateBatchModal
                show={showUpdateModal}
                onClose={closeUpdateModal}
                onConfirm={(batchData) => {
                    setPreloadedBatch(batchData);
                    openAddModal();
                }}
            />
            <UpdateProductModal
                show={showUpdateProductModal}
                onClose={closeUpdateProductModal}
                // onConfirm={(batchData) => {
                //     setPreloadedBatch(batchData);
                //     openAddModal();
                // }}
                onRefresh={refresh}
            />
            <DeleteBatchModal
                show={showDeleteModal}
                onClose={closeDeleteModal}
                onRefresh={refresh}
            />
            <DeleteProductModal
                show={showDeleteProductModal}
                onClose={closeDeleteProductModal}
                onRefresh={refresh}
            />

        </>
    );
}

export default Home;
