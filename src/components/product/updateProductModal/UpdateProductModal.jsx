import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBatchByProductSerial } from "../../../services/api/batchService.js";
import { UpdateProduct } from "../../../services/api/productService.js";
import {ModalWrapper} from "../ModalWrapper.jsx";
import SerialInput from "../SerialInput.jsx";
import BatchInfo from "../BatchInfo.jsx";


function UpdateProductModal({ show, onClose, onRefresh }) {
    const [productSerial, setProductSerial] = useState("");
    const [productNewSerial, setProductNewSerial] = useState("");
    const [batch, setBatch] = useState(null);
    const [error, setError] = useState(null);

    const handleCancel = () => {
        setProductSerial("");
        setProductNewSerial("");
        setBatch(null);
        setError(null);
        onClose();
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") handleCancel();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    useEffect(() => {
        if (productSerial.length === 6) {
            getBatch().catch((err) => console.error("Помилка завантаження:", err));
        }
    }, [productSerial]);

    const getBatch = async () => {
        try {
            const result = await getBatchByProductSerial(productSerial);
            setBatch(result);
            setError(null);
        } catch (err) {
            setBatch(null);
            setError("Платку не знайдено або немає партії" + err);
        }
    };

    const handleConfirm = async () => {
        if (productNewSerial.length !== 6) {
            setError("Серійник нової платки має бути з 6 цифр");
            return;
        }

        try {
            const result = await UpdateProduct(productSerial, productNewSerial);
            toast.success(result.message || "Серійник успішно оновлено ✅");
            handleCancel();
            onRefresh();
        } catch (err) {
            const msg = err.message || "Не вдалося оновити серійний номер.";
            setError(msg);
            toast.error(msg);
            console.error(err);
        }
    };

    return (
        <ModalWrapper
            show={show}
            title="Заміна платки"
            onClose={handleCancel}
            onConfirm={handleConfirm}
            confirmText="Підтвердити"
            confirmDisabled={productNewSerial.length !== 6 || !batch}
        >
            <SerialInput
                label="Серійний платки"
                value={productSerial}
                onChange={setProductSerial}
                error={!batch && error}
            />

            {batch && (
                <>
                    <BatchInfo batch={batch} batchId={batch.id} />

                    <SerialInput
                        label="Новий серійний платки"
                        value={productNewSerial}
                        onChange={setProductNewSerial}
                        error={error && batch}
                    />
                </>
            )}
        </ModalWrapper>
    );
}

export default UpdateProductModal;
