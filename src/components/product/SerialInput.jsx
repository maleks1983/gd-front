import { Form, InputGroup } from "react-bootstrap";

function SerialInput({ label, value, onChange, error, placeholder = "123456" }) {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <InputGroup>
                <InputGroup.Text>DG</InputGroup.Text>
                <Form.Control
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
                    maxLength={6}
                    inputMode="numeric"
                    placeholder={placeholder}
                />
            </InputGroup>
            {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </Form.Group>
    );
}

export default SerialInput;