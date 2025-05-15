import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function DeleteProductModal({ show, onHide, onDelete }) {
    const [serial, setSerial] = useState("");
    const [error, setError] = useState("");

    const handleDelete = () => {
        if (!/^\d{6}$/.test(serial)) {
            setError("Введіть правильний серійний номер (6 цифр)");
            return;
        }

        setError("");
        onDelete(parseInt(serial));
        setSerial("");
        onHide();
    };

    const handleClose = () => {
        setSerial("");
        setError("");
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Видалити продукт</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formSerial">
                    <Form.Label>Серійний номер продукту (6 цифр):</Form.Label>
                    <Form.Control
                        type="text"
                        value={serial}
                        onChange={(e) => setSerial(e.target.value)}
                        maxLength={6}
                        placeholder="Напр. 123456"
                    />
                    {error && <Form.Text className="text-danger">{error}</Form.Text>}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Скасувати
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Видалити
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
