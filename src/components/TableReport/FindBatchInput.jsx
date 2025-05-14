import { useEffect, useState } from "react";

function FindBatchInput({ searchSerial, setSearchSerial, handleSerialSearch, handleClearSearch }) {
    const [hasSearched, setHasSearched] = useState(false);

    const handleSerialChange = (e) => {
        const digitsOnly = e.target.value.replace(/\D/g, "");
        setSearchSerial(digitsOnly);
        if (digitsOnly.length < 6 && hasSearched) {
            setHasSearched(false); // дозвіл на повторний пошук
        }
    };

    useEffect(() => {
        if (searchSerial.length === 6 && !hasSearched) {
            handleSerialSearch();
            setHasSearched(true);
        }
    }, [searchSerial, hasSearched, handleSerialSearch]);

    const showClearButton = searchSerial.length > 0;

    return (
        <div className="mb-3 position-relative ms-auto me-0" style={{ width: "fit-content" }}>
            <div className="input-group">
                <span className="input-group-text">DG</span>
                <input
                    type="text"
                    className="form-control pe-4 rounded-end-2 z-1 no-focus-border"
                    placeholder="Пошук по серійному"
                    value={searchSerial}
                    onChange={handleSerialChange}
                    style={{ width: '30ch' }}
                    maxLength={6}
                    inputMode="numeric"
                    title="Серійний номер має містити рівно 6 цифр"
                    required
                />

                {showClearButton ? (
                    <button
                        className="btn btn-close position-absolute top-0 mt-2  me-2 end-0 z-2"
                        onClick={handleClearSearch}
                    />
                ) : (
                    <button
                        className="btn btn-lg position-absolute top-0 p-0 mt-1 me-2 end-0 z-2"
                        onClick={() => {
                            if (searchSerial.length === 6) {
                                handleSerialSearch();
                            }
                        }}
                        type="button"
                    >
                        <i className="bi bi-search"></i>
                    </button>
                )}
            </div>

        </div>
    );
}

export default FindBatchInput;
