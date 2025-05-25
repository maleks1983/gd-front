

function FirmwaresBatch({batch, setBatch}) {
    return (
        <>
            <div className="mb-3">
                <label className="form-label">Прошивка</label>
                <select
                    className="form-select"
                    value={batch.firmware || ""}
                    onChange={(e) => {
                        setBatch({...batch, firmware: e.target.value} )
                    }

                    }
                    required
                >
                    <option value="" disabled>Оберіть прошивку</option>
                    <option value="fw-001">FW 001</option>
                    <option value="fw-002">FW 002</option>
                    <option value="fw-003">FW 003</option>
                </select>
            </div>
        </>
    )
}

export default FirmwaresBatch;
