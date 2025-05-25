import {Link, Outlet} from "react-router-dom";
import {useUser} from "../hooks/useUser";
import {useState} from "react";
import FindBatchInputSerial from "../components/TableReport/FindBatchInput";
import SidebarHome from "../components/Slidebar/SidebarHome.jsx";
import ProfileButton from "../components/profile/ProfileButton.jsx";
import {BatchUIProvider} from "../context/BatchUIProvider.jsx";




function Layout() {
    const {user} = useUser();
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false); // для мобільного меню

    return (
        <>
            <BatchUIProvider>
                <div className="d-flex flex-column min-vh-100">
                    {/* Header */}
                    <header className="bg-light">
                        <div className="container py-2 px-3 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                                {/* ☰ Кнопка на малих екранах */}
                                <button
                                    className="btn btn-outline-secondary d-md-none me-2"
                                    onClick={() => setShowSidebar(true)}
                                >
                                    ☰
                                </button>

                                <Link to="/" className=" d-none d-md-block text-decoration-none h5 m-0">🏠 Головна</Link>
                            </div>

                            <FindBatchInputSerial onSearchResult={(batch) => setSelectedBatch(batch)}/>
                            <div className="d-flex align-items-center gap-2">
                                {user && <ProfileButton/>}
                            </div>

                        </div>
                    </header>

                    {/* Main */}
                    <main className="flex-grow-1 py-4 container">
                        <div className="row">
                            {/* Сайдбар — завжди видимий на md+ */}
                            <div className="col-md-3 d-none d-md-block border-end bg-light">
                                <SidebarHome/>
                            </div>

                            {/* Контент */}
                            <div className="col-md-9">
                                <Outlet context={{selectedBatch, setSelectedBatch}}/>

                            </div>
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="bg-light mt-auto">
                        <div className="container text-center py-2">
                            <small>&copy; {new Date().getFullYear()} My App</small>
                        </div>
                    </footer>

                    {/* Мобільний сайдбар поверх */}
                    {showSidebar && (
                        <>
                            <div
                                className="position-fixed top-0 start-0 bg-white shadow p-3 h-100"
                                style={{width: "250px", zIndex: 1050}}
                            >
                                <button
                                    className="btn btn-close mb-3"
                                    onClick={() => setShowSidebar(false)}
                                ></button>
                                <SidebarHome/>
                            </div>

                            {/* Темна підкладка */}
                            <div
                                className="position-fixed top-0 start-0 w-100 h-100"
                                style={{backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040}}
                                onClick={() => setShowSidebar(false)}
                            />
                        </>
                    )}
                </div>
            </BatchUIProvider>
        </>

    );
}

export default Layout;
