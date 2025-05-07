import {Route, Routes} from 'react-router-dom';
import {useEffect} from 'react';
import {useUser} from './UserContext';

import './App.css'

import Home from './Home';
import PrivateRoute from './PrivateRoute';
import Login from "./login/Login.jsx";

function App() {
    const {setUser, setLoading} = useUser();


    useEffect(() => {
        fetch('http://localhost:8080/me', {
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
            <Route path="/login" element={<Login/>}/>
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Home/>
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default App;
