export async function fetchCurrentUser() {
    const res = await fetch('/api/me', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
        credentials: 'include'
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Не вдалося отримати користувача');
    }

    return res.json();
}