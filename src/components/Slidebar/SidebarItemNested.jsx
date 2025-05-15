import { useState } from "react";
import { Link } from "react-router-dom";

function SidebarItemNested({ label, subItems = [] }) {
    const [open, setOpen] = useState(false);

    return (
        <li className="mb-1">
            <button
                className="btn btn-toggle w-100 text-start ms-3"
                onClick={() => setOpen(!open)}
            >
                {label}
            </button>
            <div className={`collapse ${open ? "show" : ""}`}>
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1">
                    {subItems.map((item, i) => (
                        <li key={i}>
                            <Link to={item.to || "#"} className="link-dark d-block px-4">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
}

export default SidebarItemNested;
