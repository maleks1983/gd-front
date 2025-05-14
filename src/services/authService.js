export async function loginUser({ tel, password }) {
    const formData = new FormData();
    formData.append('username', tel); // сервер очікує "username"
    formData.append('password', password);

    return await fetch('/login', {
        method: 'POST',
        body: formData,
        credentials: 'include',
    });
}

export async function fetchCurrentUser() {
    const res = await fetch('/api/me', {
        credentials: 'include',
        headers: {
            Accept: 'application/json',
        },
    });

    if (!res.ok) throw new Error('Не вдалося отримати користувача');
    return res.json();
}

export async function logoutUser() {
    const res = await fetch('/logout', {
        method: 'POST',
        credentials: 'include',
    });

    if (!res.ok) throw new Error('Вихід не вдався');
}

