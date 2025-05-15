import {useNavigate} from 'react-router-dom';
import {useUser} from "../../hooks/useUser.js";
import {loginUser} from "../../services/authService.js";
import {fetchCurrentUser} from "../../services/api/userService.js";

function Login() {
    const {setUser} = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tel = e.target.tel.value;
        const password = e.target.password.value;

        try {
            await loginUser({tel, password});
            const user = await fetchCurrentUser();
            setUser(user);
            navigate('/');
        } catch (e) {
            alert(e.message);
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
