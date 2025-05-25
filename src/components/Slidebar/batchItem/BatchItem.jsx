import {useState} from "react";
import {useBatchUI} from "../../../hooks/useBatchUI.js";


function BatchItem() {
    const [open, setOpen] = useState(false);
    const {openAddModal, openUpdateModal, openDeleteModal} = useBatchUI();

    const label = "Партії";

    const items = [
        {label: "Створити", onClick: openAddModal},
        {label: "Змінити", onClick: openUpdateModal},
        {label: "Видалити", onClick: openDeleteModal},
    ];

    return (
        <li className="mb-1">
            <button
                className="btn btn-toggle w-100 text-start"
                onClick={() => setOpen(!open)}
            >
                {label}
            </button>
            <div className={`collapse ${open ? "show" : ""}`}>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1">
                    {items.map((item, i) => (
                        <li key={i}>
                            <button
                                className="accordion-button d-block px-4"
                                onClick={() => {
                                    item.onClick?.();
                                }}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
}

export default BatchItem;
