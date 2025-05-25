import {useEffect, useState} from "react";
import * as batchService from "../../../services/api/batchService.js";
import {SaveProduct} from "../../../services/api/productService.js";
import {toast} from "react-toastify";
import {ModalWrapper} from "../ModalWrapper.jsx";
import SerialInput from "../SerialInput.jsx";
import BatchInfo from "../BatchInfo.jsx";


function AddProductModal({show, onClose, onRefresh}) {
    const [batchId, setBatchId] = useState("");
    const [productSerial, setProductSerial] = useState("");
    const [batch, setBatch] = useState(null);
    const [confirmStep, setConfirmStep] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCancel = () => {
        setBatchId("");
        setProductSerial("");
        setBatch(null);
        setConfirmStep(false);
        setIsLoading(false);
        onClose();
    };

    const handleNext = async () => {
        try {
            const batchDB = await batchService.getBatchById(batchId);
            if (batchDB) {
                setBatch(batchDB);
                setConfirmStep(true);
            } else {
                toast.error("Партію не знайдено!");
            }
        } catch {
            toast.error("Партію не знайдено!");
        }
    };

    const handleAdd = async () => {
        const serialInt = Number(productSerial);
        if (isNaN(serialInt) || productSerial.length !== 6) {
            toast.warning("Серійник має бути 6-значним числом");
            return;
        }

        setIsLoading(true);
        try {
            await SaveProduct({batchId: batch.id, serial: serialInt});
            toast.success(`Платку #${productSerial} додано до партії`);
            handleCancel();
            onRefresh();
        } catch (err) {
            console.error("Помилка при додаванні платки:", err);
            toast.error("Не вдалося додати платку. Можливо, серійник уже існує.");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") handleCancel();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <ModalWrapper
            show={show}
            title={confirmStep ? "Підтвердження додавання платки" : "Введіть номер партії"}
            onClose={handleCancel}
            onConfirm={confirmStep ? handleAdd : handleNext}
            confirmText={confirmStep ? "Додати" : "Далі"}
            confirmDisabled={confirmStep ? productSerial.length !== 6 || isLoading : batchId.length !== 6}
        >
            {!confirmStep ? (
                <SerialInput
                    label="Номер партії"
                    value={batchId}
                    onChange={setBatchId}
                />
            ) : (
                <>
                    <BatchInfo batch={batch} batchId={batchId}/>

                    <SerialInput
                        label="Серійний нової платки"
                        value={productSerial}
                        onChange={setProductSerial}
                    />
                </>
            )}
        </ModalWrapper>
    );
}

export default AddProductModal;
