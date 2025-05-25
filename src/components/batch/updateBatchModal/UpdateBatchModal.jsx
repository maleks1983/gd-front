import {useState} from "react";
import * as batchService from "../../../services/api/batchService.js";

function UpdateBatchModal({show, onClose, onConfirm }) {

    const [batchId, setBatchId] = useState("");
    const [error, setError] = useState(null);

    const handleConfirm = async () => {
        try {
            const batchData = await batchService.getBatchById(batchId);
            if (batchData) {
                onConfirm(batchData); // передаємо дані в AddBatchModal
                setBatchId("");
                setError(null);
                onClose();
            } else {
                setError("Партію не знайдено");
            }
        } catch (err) {
            setError("Помилка при отриманні партії" + err);
        }
    };


    if (!show) return null;


    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Введіть ID партії</h5>
                            <button className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={batchId}
                                onChange={(e) => {
                                    setBatchId(e.target.value.replace(/\D/g, ""));
                                    setError(null);
                                }}
                                placeholder="Введіть ID (наприклад: 100001)"
                                maxLength={6}
                            />
                            {error && <div className="text-danger mt-2">{error}</div>}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>Скасувати</button>
                            <button
                                className="btn btn-primary"
                                onClick={handleConfirm}
                                disabled={batchId.length !== 6}
                            >
                                Далі
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateBatchModal