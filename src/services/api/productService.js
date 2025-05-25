import {getHeaders} from "../appService.js";


export async function UpdateProduct(serial, newSerial) {
    const response = await fetch("/api/products", {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({
            oldSerial: serial,
            newSerial: newSerial
        }),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error("Помилка при зміні серійного платки");
    }

    return await response.json();
}


export async function FindProductBySerial(serial) {

    const response = await fetch(`/api/products/${serial}`, {
        method: "GET",
        headers: getHeaders(),
        credentials: 'include'
    })
    if (!response.ok) {
        throw new Error("Помилка при збереженні партії");
    }

    return await response.json();
}

export async function SaveProduct(product) {
    const headers = getHeaders();

    const response = await fetch("/api/products", {
        method: "POST",
        headers,
        body: JSON.stringify(product),
        credentials: 'include'
    });

    if (!response.ok) {
        // Спроба отримати повідомлення помилки з сервера
        let errorMessage = "Помилка при збереженні платки";

        try {
            const errorData = await response.json();
            if (errorData.message) {
                errorMessage = errorData.message;
            }
        } catch {
            // Нічого не робимо, якщо не JSON
        }

        throw new Error(errorMessage);
    }

    return await response.json();
}


export async function deleteProductBySerial(serial) {
    const headers = getHeaders();
    const response = await fetch(`/api/products/${serial}`, {
        headers: headers,
        method: "DELETE",
        credentials: 'include'

    });

    if (!response.ok) {
        throw new Error("Помилка при видаленні партії");
    }

    return null;
}

