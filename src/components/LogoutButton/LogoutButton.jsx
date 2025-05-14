import { useUser } from "../../hooks/useUser";
import { logoutUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const { setUser } = useUser();
    const navigate = useNavigate();

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

    return <button className="btn btn-outline-danger" onClick={handleLogout}>Вийти</button>;
}

export default LogoutButton;
