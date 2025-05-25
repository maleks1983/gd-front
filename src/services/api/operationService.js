import {getHeaders} from "../appService.js";

const url = "/api/batch";

export async function createOperation(operation) {
    const response = await fetch(url, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(operation),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error("Помилка при створені операції");
    }

}

export async function updateOperation(operation) {
    const response = await fetch(url, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(operation),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error("Помилка при збереженні операції");
    }

    return await response.json();
}

export async function deleteOperation(operationId) {
    const headers = getHeaders();
    const response = await fetch(`${url}/${operationId}`, {
        headers: headers,
        method: "DELETE",
        credentials: 'include'

    });

    if (!response.ok) {
        throw new Error("Помилка при видаленні операції");
    }

    return null;
}

export async function getAll() {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Accept': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        console.warn("Операції не знайдено");
        return null;
    }
    return await response.json();
}

export async function getBatchById(operationId) {
    try {
        const response = await fetch(`${url}/${operationId}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            console.warn("Операцію не знайдено");
            return null;
        }

        return await response.json();
    } catch (e) {
        console.error("Помилка:", e);
        throw e;
    }
}
