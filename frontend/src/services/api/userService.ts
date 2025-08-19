// src/services/api/usersService.ts

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/users'; // Base URL da API de usuários

// Função para buscar a lista de usuários com paginação e filtro
export const fetchUsers = async (page: number, searchTerm: string) => {
    const response = await axios.get(API_BASE_URL, {
        params: {
            page,
            limit: 10,
            search: searchTerm,
        },
    });
    return response.data; // Retorna os dados já no formato esperado pelo hook
};

// Função para deletar um usuário
export const deleteUser = async (userId: string) => {
    const response = await axios.delete(`${API_BASE_URL}/${userId}`);
    return response.data; // Retorna a resposta do delete, se necessário
};

// Função para criar um novo usuário (exemplo de função adicional)
export const createUser = async (userData: any) => {
    const response = await axios.post(API_BASE_URL, userData);
    return response.data;
};

// Função para atualizar um usuário existente
export const updateUser = async (userId: string, userData: any) => {
    const response = await axios.put(`${API_BASE_URL}/${userId}`, userData);
    return response.data;
};
