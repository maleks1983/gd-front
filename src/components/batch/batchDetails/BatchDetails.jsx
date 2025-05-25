import { useState } from "react";
import ProductDetailsModal from "./ProductDetailsModal.jsx";

function BatchDetails({ batch, setBatch, onBack, onUpdateBatch }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedProductIndex, setSelectedProductIndex] = useState(null);

    return (
        <>
            <div>
                <button className="btn btn-secondary mb-3" onClick={onBack}>
                    ← Назад
                </button>
                <h4>Партія #{batch.id}</h4>
                <p>Кількість: {batch.quantity}</p>
                <p>Прошивка: {batch.firmware}</p>
                <h6>Діапазони:</h6>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control ms-auto me-0"
                        style={{width: '26ch'}}
                        placeholder="Введіть для фільтрації..."
                        // value={filterText}
                        // onChange={(e) => setFilterText(e.target.value)}
                    />
                </div>
                <ul>
                    {batch.ranges.map((r, i) => {
                        const start = Number(r.start);
                        const end = Number(r.end);

                        if (isNaN(start) || isNaN(end) || start > end || end - start > 1000) {
                            return <li key={i}>Некоректний діапазон</li>;
                        }

                        const ids = [];
                        for (let id = start; id <= end; id++) {
                            ids.push(id.toString().padStart(6, "0"));
                        }

                        return (
                            <li key={i}>
                                <strong>Діапазон {i + 1}:</strong>
                                <ul className="list-inline mt-1">
                                    {ids.map((serial) => (
                                        <li
                                            key={serial}
                                            className="list-inline-item text-primary"
                                            style={{cursor: "pointer", marginRight: "8px"}}
                                            onClick={() => {
                                                setSelectedProductIndex(serial);
                                                setShowModal(true);
                                            }}
                                        >
                                            DG{serial}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <ProductDetailsModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={() => setShowModal(false)}
                batch={batch}
                setBatch={setBatch}
                selectedProduct={selectedProductIndex}
                onUpdateBatch={onUpdateBatch}
            />
        </>
    );
}

export default BatchDetails;
