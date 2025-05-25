import React from "react";

function BatchInfo({ batch, batchId }) {
    return (
        <div className="mb-3">
            <p>Партія: <strong>#{batchId}</strong></p>
            <p>Кількість: <strong>{batch.quantity}</strong></p>
            <p>Прошивка: <strong>{batch.firmware}</strong></p>
            <div>
                <strong>Діапазони:</strong>
                <ul className="mb-0">
                    {batch.ranges?.map((r, i) => (
                        <li key={i}>{r.start} - {r.end}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default BatchInfo;