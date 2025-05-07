
import { useNavigate } from 'react-router-dom';
import {useUser} from "../UserContext.jsx";



function Login() {
    const { setUser } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', e.target.tel.value); // ⚠️ обов’язково "username"
        formData.append('password', e.target.password.value);

        const loginRes = await fetch('http://localhost:8080/login', {
            method: 'POST',
            body: formData,
            credentials: 'include', // важливо для cookie-сесії
        });

        if (loginRes.ok) {
            const meRes = await fetch('http://localhost:8080/me', {
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (meRes.ok) {
                const user = await meRes.json();
                setUser(user);
                navigate('/');
            } else {
                alert('Не вдалося отримати користувача');
            }
        } else {
            alert('Невірний телефон або пароль');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className="card p-4 shadow" style={{width: '100%', maxWidth: '400px'}}>
                <h3 className="text-center mb-3">Вхід</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="tel" className="form-label">Номер телефону</label>
                        <div className="input-group">
                            <span className="input-group-text">+380</span>
                            <input
                                type="tel"
                                className="form-control"
                                id="tel"
                                name="tel"
                                pattern="[0-9]{9}"
                                placeholder="__ ___ __ __"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Пароль</label>
                        <input type="password" className="form-control" id="password" name="password" required/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Увійти</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
