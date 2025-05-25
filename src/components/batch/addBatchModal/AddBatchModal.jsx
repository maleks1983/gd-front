// AddBatchModal.jsx
import {useEffect, useState} from "react";
import InputQuantityBatch from "./InputQuantityBatch.jsx";
import FirmwaresBatch from "./FirmwaresBatch.jsx";
import OperationsBatch from "./OperationsBatch.jsx";
import * as batchService from "../../../services/api/batchService.js";

const initialBatch = {
    id: "",
    ranges: [{start: "", end: ""}],
    quantity: "",
    firmware: "fw-001",
    operations: [1, 2],
}

function AddBatchModal({show, onClose, onRefresh, initialBatchData, setPreloadedBatch}) {

    const getInitialBatch = () => {
        return initialBatchData || initialBatch;
    };

    const [batch, setBatch] = useState(getInitialBatch);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    useEffect(() => {
        if (show) {
            setBatch(getInitialBatch());
        }
    }, [show, initialBatchData]);

    if (!show) return null;

    const isQuantityMismatch = () => {
        const total = batch.ranges.reduce((sum, r) => {
            const diff = Number(r.end) - Number(r.start) + 1;
            return sum + (isNaN(diff) || diff < 0 ? 0 : diff);
        }, 0);
        return Number(batch.quantity) !== total;
    };

    const handleAddBatchSubmit = async (e) => {
        e.preventDefault();
        try {
            await batchService.saveBatch(batch);
            onClose();
            setPreloadedBatch(initialBatch);
            setBatch(initialBatch);
            onRefresh();
        } catch (e) {
            console.error("Помилка при додаванні партії:", e);
        }
    };


    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
                style={{backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form onSubmit={handleAddBatchSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title">{batch.id === "" ? "Нова партія" : `Партія: ${batch.id}`}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={onClose}
                                    onTouchEnd={onClose}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Кількість</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        disabled={batch.id !== ""}
                                        value={batch.quantity}
                                        onChange={(e) =>
                                            setBatch({
                                                ...batch,
                                                quantity: e.target.value,
                                                ranges: [{start: "", end: ""}]
                                            })
                                        }
                                        inputMode="numeric"
                                        required
                                    />
                                </div>

                                <FirmwaresBatch
                                    batch={batch}
                                    setBatch={setBatch}
                                />

                                <OperationsBatch
                                    batch={batch}
                                    setBatch={setBatch}
                                />

                                <div className="mb-3">
                                    <h5 className="form-label text-center">Діапазони</h5>
                                    {batch.ranges.map((range, index) => (
                                        <InputQuantityBatch
                                            key={index}
                                            range={range}
                                            index={index}
                                            batch={batch}
                                            setBatch={setBatch}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={onClose}
                                >
                                    Скасувати
                                </button>
                                <button type="submit" className="btn btn-primary"
                                        disabled={isQuantityMismatch()}>
                                    Зберегти
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}

export default AddBatchModal;