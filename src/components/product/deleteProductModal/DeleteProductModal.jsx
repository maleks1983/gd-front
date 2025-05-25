import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {deleteProductBySerial} from "../../../services/api/productService.js";
import {ModalWrapper} from "../ModalWrapper.jsx";
import SerialInput from "../SerialInput.jsx";


function DeleteProductModal({show, onClose, onRefresh}) {
    const [serial, setSerial] = useState("");
    const [error, setError] = useState("");

    const handleCancel = () => {
        setSerial("");
        setError("");
        onClose();
    };

    const handleDelete = async () => {
        if (!/^\d{6}$/.test(serial)) {
            setError("Введіть правильний серійний номер (6 цифр)");
            return;
        }

        try {
            await deleteProductBySerial(Number(serial));
            toast.success(`Платку #${serial} видалено ✅`);
            handleCancel();
            onRefresh();
        } catch (e) {
            toast.error("Не вдалося видалити платку");
            console.error(e);
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
            title="Видалення платки"
            onClose={handleCancel}
            onConfirm={handleDelete}
            confirmText="Видалити"
            confirmDisabled={serial.length !== 6}
        >
            <SerialInput
                label="Серійний номер платки"
                value={serial}
                onChange={setSerial}
                error={error}
            />
        </ModalWrapper>
    );
}

export default DeleteProductModal;
