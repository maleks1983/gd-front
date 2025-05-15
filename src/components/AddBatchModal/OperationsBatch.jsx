import {operationList} from "../../constants/InitialBatch.js";

function OperationsBatch({batch, setBatch}) {


    return (
        <>
            <div className="mb-3">
                <label className="form-label">Операції</label>
                <div className="form-check">
                    {operationList.map(op => (
                        <div key={op.id} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`op-${op.id}`}
                                checked={batch.operations?.includes(op.id) || false}
                                onChange={(e) => {
                                    const selected = batch.operations || [];
                                    const updated = e.target.checked
                                        ? [...selected, op.id]
                                        : selected.filter(id => id !== op.id);
                                    setBatch({...batch, operations: updated});
                                }}
                            />
                            <label className="form-check-label" htmlFor={`op-${op.id}`}>
                                {op.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default OperationsBatch;