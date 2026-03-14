import api from './api';

export const fetchUsersApi = async (page: number, perPage: number = 5) => {
    const response = await api.get(`/users?page=${page}&per_page=${perPage}`);
    return response.data;

};

export const fetchUserDetailApi = async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};

export const createUserApi = async (userData: any) => {
    const response = await api.post('/users', userData);
    return response.data;
};

export const updateUserApi = async (id: number, userData: any) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
};
