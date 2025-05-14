export async function createBatch(batch) {
    const response = await fetch("/api/batch", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(batch),
    });

    if (!response.ok) {
        throw new Error("Помилка при збереженні партії");
    }

    return await response.json();
}

export async function updateBatch(batch) {
    const response = await fetch("/api/batch", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(batch),
    });

    if (!response.ok) {
        throw new Error("Помилка при збереженні партії");
    }

    return await response.json();
}

export async function deleteBatchService(batchId) {
    const response = await fetch(`/api/batch/${batchId}`, { method: "DELETE" });

    if (!response.ok) {
        throw new Error("Помилка при видаленні партії");
    }

    return null;
}

export async function getAllByPage(size,page) {
    const response = await fetch(`/api/batch?page=${page}&size=${size}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    });
    if (!response.ok) {
        console.warn("Партії не знайдено");
        return null;
    }
    return await response.json()
}


export async function getBatchByProductSerial(serial) {
    try {
        const response = await fetch(`/api/batch/by-product/${serial}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });

        if (!response.ok) {
            console.warn("Партію не знайдено");
            return null;
        }
        return await response.json()
    } catch (e) {
        console.error("Помилка:", e);
        throw e;
    }
}