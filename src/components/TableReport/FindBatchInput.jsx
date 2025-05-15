import { useEffect, useState } from "react";
import * as batchService from "../../services/api/batchService.js";

function FindBatchInput({ onSearchResult }) {
    const [hasSearched, setHasSearched] = useState(false);
    const [searchSerial, setSearchSerial] = useState("");
    const [placeholder, setPlaceholder] = useState("Пошук по серійному");

    // Адаптивний placeholder залежно від ширини екрана
    useEffect(() => {
        const updatePlaceholder = () => {
            if (window.innerWidth < 576) {
                setPlaceholder("Пошук...");
            } else {
                setPlaceholder("Пошук по серійному");
            }
        };

        updatePlaceholder(); // при першому рендері
        window.addEventListener("resize", updatePlaceholder);
        return () => window.removeEventListener("resize", updatePlaceholder);
    }, []);

    // Обробка змін поля
    const handleSerialChange = (e) => {
        const digitsOnly = e.target.value.replace(/\D/g, "");
        setSearchSerial(digitsOnly);
        if (digitsOnly.length < 6 && hasSearched) {
            setHasSearched(false); // дозвіл на повторний пошук
        }
    };

    // Пошук автоматично при введенні 6 цифр
    useEffect(() => {
        const search = async () => {
            if (searchSerial.length === 6 && !hasSearched) {
                try {
                    const batch = await batchService.getBatchByProductSerial(searchSerial);
                    onSearchResult?.(batch);
                } catch (err) {
                    console.warn("Не знайдено партію", err);
                    onSearchResult?.(null);
                }
                setHasSearched(true);
            }
        };
        search();
    }, [searchSerial, hasSearched, onSearchResult]);

    const handleManualSearch = async () => {
        if (searchSerial.length === 6) {
            try {
                const batch = await batchService.getBatchByProductSerial(searchSerial);
                onSearchResult?.(batch);
            } catch (err) {
                console.warn("Не знайдено партію", err);
                onSearchResult?.(null);
            }
            setHasSearched(true);
        }
    };

    const handleClearClick = () => {
        setSearchSerial("");
        setHasSearched(false);
        onSearchResult?.(null);
    };

    const showClearButton = searchSerial.length > 0;

    return (
        <div className="position-relative ms-auto me-3">
            <div className="input-group">
                <span className="input-group-text">DG</span>
                <input
                    type="text"
                    className="form-control pe-4 rounded-end-2 z-1"
                    placeholder={placeholder}
                    value={searchSerial}
                    onChange={handleSerialChange}
                    style={{ maxWidth: "30ch" }}
                    maxLength={6}
                    inputMode="numeric"
                    title="Серійний номер має містити рівно 6 цифр"
                    required
                />

                {showClearButton ? (
                    <button
                        className="btn btn-close position-absolute top-0 mt-2 me-2 end-0 z-2"
                        onClick={handleClearClick}
                        type="button"
                    />
                ) : (
                    <button
                        className="btn btn-lg position-absolute top-0 p-0 mt-1 me-2 end-0 z-2"
                        onClick={handleManualSearch}
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
