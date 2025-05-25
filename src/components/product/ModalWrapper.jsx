import {Button, Modal} from "react-bootstrap";

export function ModalWrapper({
                                 show,
                                 title,
                                 onClose,
                                 onConfirm,
                                 confirmText = "OK",
                                 confirmDisabled = false,
                                 children
                             }) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Скасувати</Button>
                <Button variant="primary" onClick={onConfirm} disabled={confirmDisabled}>{confirmText}</Button>
            </Modal.Footer>
        </Modal>
    );
}