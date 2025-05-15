import {getHeaders} from "../appService.js";



export async function updateProductService(productId) {
    const headers = getHeaders();
    const response = await fetch("/api/products", {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(productId),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error("Помилка при збереженні партії");
    }

    return await response.json();
}

export async function deleteProductBySerial(productId) {
    const headers = getHeaders();
    const response = await fetch(`/api/products/${productId}`, {
        headers: headers,
        method: "DELETE",
        credentials: 'include'

    });

    if (!response.ok) {
        throw new Error("Помилка при видаленні партії");
    }

    return null;
}

