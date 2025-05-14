import { Outlet, Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import { useUser } from "../hooks/useUser";

function Layout() {
    const { user } = useUser();

    return (
        <div className="d-flex flex-column min-vh-100">
            <header className="bg-light shadow-sm py-2 px-4 d-flex justify-content-between align-items-center">
                <Link to="/" className="text-decoration-none h5 m-0">🏠 Головна</Link>
                {user && <LogoutButton />}
            </header>

            <main className="container flex-grow-1 py-4">
                <Outlet /> {/* Тут будуть рендеритись дочірні сторінки */}
            </main>

            <footer className="bg-light text-center py-2 mt-auto">
                <small>&copy; {new Date().getFullYear()} My App</small>
            </footer>
        </div>
    );
}

export default Layout;
