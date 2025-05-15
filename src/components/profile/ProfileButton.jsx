import { useEffect, useRef, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService.js";

function ProfileButton() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef();

    // Закриття меню при кліку поза дропдауном
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSettings = () => {
        navigate("/settings");
        setOpen(false);
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (err) {
            console.warn("Logout failed", err);
        }
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button
                className="btn btn-outline-primary d-flex align-items-center gap-2"
                onClick={() => setOpen((prev) => !prev)}
            >
                <i className="bi bi-person-fill"></i>
                <span className="d-none d-md-inline">{user.name}</span>
                <i className="bi bi-caret-down-fill small"></i>
            </button>

            {open && (
                <ul className="dropdown-menu show position-absolute end-0 mt-2">
                    <li>
                        <button className="dropdown-item" onClick={handleSettings}>
                            <i className="bi bi-gear me-2"></i> Особистий кабінет
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-2"></i> Вихід
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;
