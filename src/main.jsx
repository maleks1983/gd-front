import ReactDOM from 'react-dom/client';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "./UserContext.jsx";
import {StrictMode} from "react";


ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <UserProvider>
                <App/>
            </UserProvider>
        </BrowserRouter>
    </StrictMode>
);