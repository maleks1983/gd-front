import {getCsrfToken, getHeaders} from "./appService.js";


export async function loginUser({tel, password}) {
    const formData = new FormData();
    formData.append('username', tel);
    formData.append('password', password);

    const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        body: formData,
        credentials: 'include'
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Логін не вдався');
    }

    return true;
}


export async function logoutUser() {
    const token = getCsrfToken();
    if (!token) throw new Error("CSRF-токен відсутній");

    const res = await fetch('/logout', {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include'
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Вихід не вдався');
    }
}

