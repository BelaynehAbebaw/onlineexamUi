
const API_URL = 'http://localhost:8080/api/users';


// ============================
// GET ALL USERS
// ============================

export const fetchUsers = async () => {

    const response = await fetch(`${API_URL}/all`);

    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`);
    }

    return await response.json();
};


// ============================
// REGISTER USER
// ============================

export const registerUser = async (user) => {

    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(user)
    });

    if (!response.ok) {

        const text = await response.text();

        throw new Error(
            text || `Failed to register user: ${response.status}`
        );
    }

    return await response.json();
};


export const updateUser = async (id, userData) => {

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(userData)
    });

    if (!response.ok) {

        const errorText = await response.text();

        throw new Error(
            errorText || 'Failed to update user.'
        );

    }

    return await response;
};


// ============================
// DELETE USER
// ============================

export const deleteUser = async (id) => {

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {

        const text = await response.text();

        throw new Error(
            text || `Failed to delete user: ${response.status}`
        );
    }

    return true;
};
