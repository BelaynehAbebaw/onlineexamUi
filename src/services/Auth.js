const API_URL = 'http://localhost:8080/api/users/auth';

export const loginUser = async (loginData) => {

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(loginData)
    });

    const text = await response.text();

    let data;

    try {
        data = JSON.parse(text);
    } catch {
        data = text;
    }

    if (!response.ok) {

        throw new Error(
            typeof data === 'string'
                ? data
                : data.message || 'Invalid credentials'
        );
    }

    return data;
};