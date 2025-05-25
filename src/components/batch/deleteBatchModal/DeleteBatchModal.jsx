import {useEffect, useState} from "react";
import * as batchService from "../../../services/api/batchService.js";
import {toast} from "react-toastify";

function DeleteBatchModal({show, onClose, onRefresh}) {
    const [batchId, setBatchId] = useState("");
    const [batch, setBatch] = useState(null); // знайдена партія
    const [confirmStep, setConfirmStep] = useState(false);


    const handleInputChange = (e) => {
        const digitsOnly = e.target.value.replace(/\D/g, "");
        setBatchId(digitsOnly);
    };

    const handleCancel = () => {
        setBatchId("");
        setBatch(null);
        setConfirmStep(false);
        onClose();
    };

    const handleNext = async () => {
        try {
            const batchDB = await batchService.getBatchById(batchId);
            if (batchDB) {
                setBatch(batchDB);
                setConfirmStep(true);
            } else {
                handleCancel();
                toast.error("Партію не знайдено!");
            }
        } catch {
            toast.error("Партію не знайдено!");
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await batchService.deleteBatch(Number(batchId));
            handleCancel();
            onRefresh();
            toast.success("Партію успішно видалено!");
        } catch {
            handleCancel();
            toast.error("Не вдалося видалити партію!");
        }
    };


    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") handleCancel();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    if (!show) return null;


    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
                style={{backgroundColor: "rgba(0, 0, 0, 0.3)"}}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {confirmStep ? "Підтвердження видалення" : "Введіть номер партії"}
                            </h5>
                            <button type="button" className="btn-close" onClick={handleCancel}></button>
                        </div>

                        <div className="modal-body">
                            {!confirmStep ? (
                                <>
                                    <label className="form-label">Номер партії</label>
                                    <div className="input-group">
                                        <span className="input-group-text">DG</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={batchId}
                                            onChange={handleInputChange}
                                            inputMode="numeric"
                                            maxLength={6}
                                            required
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p>
                                        Ви впевнені, що хочете <strong>безповоротно видалити</strong> партію{" "}
                                        <strong>DG{batchId}</strong>?
                                    </p>
                                    <div className="d-flex">
                                        <h5 className="modal-title">Діапазони:</h5>
                                        <div className="ms-5">
                                            {batch.ranges?.map((r, i) => (
                                                <div key={i}>
                                                    {r.start} - {r.end}
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={handleCancel}>
                                Скасувати
                            </button>
                            {!confirmStep ? (
                                <button
                                    className="btn btn-danger"
                                    onClick={handleNext}
                                    disabled={batchId.length !== 6}
                                >
                                    Далі
                                </button>
                            ) : (
                                <button className="btn btn-danger" onClick={handleConfirmDelete}>
                                    Видалити
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteBatchModal;
