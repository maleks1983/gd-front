import { useEffect, useState } from "react";

function ProductDetailsModal({ show, onClose, onSubmit, batch, setBatch, selectedProduct }) {
    const [replacementSerial, setReplacementSerial] = useState("");

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!show) return null;

    function splitRangeByDefect(range, defectiveSerial) {
        const start = Number(range.start);
        const end = Number(range.end);
        const defect = Number(defectiveSerial);

        if (
            isNaN(start) || isNaN(end) || isNaN(defect) ||
            start > end || defect < start || defect > end
        ) {
            throw new Error("Некоректні дані для розбиття діапазону");
        }

        const result = [];

        if (defect > start) {
            result.push({ start: start.toString(), end: (defect - 1).toString() });
        }
        if (defect < end) {
            result.push({ start: (defect + 1).toString(), end: end.toString() });
        }

        return result;
    }

    const applyReplacement = () => {
        const serialNumber = selectedProduct.replace("DG", "");

        const index = batch.ranges.findIndex(range => {
            const s = Number(range.start);
            const e = Number(range.end);
            const target = Number(serialNumber);
            return !isNaN(s) && !isNaN(e) && s <= target && e >= target;
        });

        if (index === -1) return;

        const currentRange = batch.ranges[index];
        const updatedRanges = [...batch.ranges];
        updatedRanges.splice(index, 1, ...splitRangeByDefect(currentRange, serialNumber));

        if (replacementSerial) {
            updatedRanges.push({ start: replacementSerial, end: replacementSerial });
        }

        setBatch({ ...batch, ranges: updatedRanges });
        onSubmit();
    };

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Продукт {selectedProduct} у партії {batch.id}</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Тип прошивки:</strong> {batch.firmware}</p>
                            <div className="mb-3">
                                <label className="form-label">Новий серійний номер (заміна):</label>
                                <div className="input-group">
                                    <span className="input-group-text">DG</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={replacementSerial}
                                        onChange={(e) => setReplacementSerial(e.target.value)}
                                        placeholder="Введіть новий серійник"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={onClose}>Закрити</button>
                            <button className="btn btn-primary" onClick={applyReplacement}>Зберегти зміни</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetailsModal;
