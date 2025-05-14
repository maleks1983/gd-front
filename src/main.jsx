import ReactDOM from 'react-dom/client';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {StrictMode} from "react";
import UserProvider from "./context/UserProvider.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <UserProvider>
                <App/>
            </UserProvider>
        </BrowserRouter>
    </StrictMode>
);