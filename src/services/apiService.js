import {getValidToken } from './tokenService';

const BASE_URL = 'https://api.intra.42.fr/v2';

async function apiRequest(endpoint) {

    // tokeservice.js gets a valid token
    const token = await getValidToken(); 

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Authorization: `bearer ${token}`,
            Accept: 'application/json',
        }
    });

    if(response.status === 404) {
        throw new Error('USER_NOT_FOUND');
    }

    if(!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }



    return response.json();
}

export async function fetchUser(login) {
    const cleanLogin = login.trim().toLowerCase();
    return apiRequest(`/users/${cleanLogin}`);
}