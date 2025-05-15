import {getHeaders} from "../appService.js";


export async function createBatchService(batch) {
    const response = await fetch("/api/batch", {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(batch),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error("Помилка при збереженні партії");
    }

}

export async function updateBatchService(batch) {
    const response = await fetch("/api/batch", {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(batch),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error("Помилка при збереженні партії");
    }

    return await response.json();
}

export async function deleteBatchService(batchId) {
    const headers = getHeaders();
    const response = await fetch(`/api/batch/${batchId}`, {
        headers: headers,
        method: "DELETE",
        credentials: 'include'

    });

    if (!response.ok) {
        throw new Error("Помилка при видаленні партії");
    }

    return null;
}

export async function getAllByPage(size, page) {
    const response = await fetch(`/api/batch?page=${page}&size=${size}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        console.warn("Партії не знайдено");
        return null;
    }
    return await response.json();
}

export async function getBatchByProductSerial(serial) {
    try {
        const response = await fetch(`/api/batch/by-product/${serial}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            console.warn("Партію не знайдено");
            return null;
        }

        return await response.json();
    } catch (e) {
        console.error("Помилка:", e);
        throw e;
    }
}
