import {Route, Routes} from 'react-router-dom';
import {useEffect} from 'react';


import './App.css'

import Home from './pages/home/Home.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import Login from "./pages/login/Login.jsx";
import {useUser} from "./hooks/useUser.js";
import Layout from "./layout/Layout.jsx";
import {ToastContainer} from "react-toastify";

function App() {
    const {setUser, setLoading} = useUser();


    useEffect(() => {
        fetch('/api/me', {
            credentials: 'include',
        })
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(data => {
                setUser(data);
            })
            .catch(() => {
                setUser(null); // важливо
            })
            .finally(() => {
                setLoading(false); // 👈 після /me
            });
    }, [setLoading, setUser]);

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route
                    index
                    element={
                        <PrivateRoute>
                            <Home/>
                            <ToastContainer position="top-center" autoClose={1500} />
                        </PrivateRoute>
                    }
                />
            </Route>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    );
}

export default App;
