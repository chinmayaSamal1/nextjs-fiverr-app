import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

export const getUser = async () => {
    const response = await axios.get(`${BASE_URL}/api/user`);
    const json = response.data;
    const err = response.error;
    if (err) return err;
    return json;
};

export const getSingleUser = async (userId) => {
    const options = {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    };
    const response = await fetch(`${BASE_URL}/api/user?id=${userId}`, options);
    const json = response.data;
    return json;
};

export async function addUser(formData) {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}/api/signUp`, options);
    const json = await response.json();
    // console.log(json);
    return json;
}

export async function logIn(formData) {
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}/api/logIn`, options);
    const json = await response.json();
    return json;
}

export async function updateUser(userId, formData) {
    const options = {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData),
    };
    const response = await fetch(`${BASE_URL}/api/user?id=${userId}`, options);
    const json = await response.json();
}

export async function deleteUser(userId) {
    const options = {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
    };
    const response = await fetch(`${BASE_URL}/api/user?id=${userId}`, options);
    const json = await response.json();
    console.log(json);
    return json;
}

export async function getAllGigs(minVal, maxVal, sort) {
    const options = {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    };
    const response = await fetch(`${BASE_URL}/api/allGigs?min=${minVal}&max=${maxVal}&sort=${sort}`);
    const json = await response.json();
    console.log(json);
    return json;
}

export async function getGig(gigId) {
    const options = {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    };
    const response = await fetch(`${BASE_URL}/api/gig?id=${gigId}`, options);
    const json = await response.json();
    console.log(json);
    return json;
}
