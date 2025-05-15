import Cookies from "js-cookie";


export function getCsrfToken() {
    return Cookies.get('XSRF-TOKEN');
}

export function getHeaders() {
    return {
        "Content-Type": "application/json",
        'X-XSRF-TOKEN': getCsrfToken()
    };
}