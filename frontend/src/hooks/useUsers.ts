import { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '@/services/api/userService.ts';

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [noResults, setNoResults] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetchUsers(page, searchTerm);
            setUsers(response.data);
            setTotalPages(response.meta.totalPages);
            setTotalItems(response.meta.totalItems);
            setNoResults(response.data.length === 0);
        } catch (error) {
            console.error('Erro ao buscar usuário', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, searchTerm]);

    const handleDelete = async () => {
        try {
            if (selectedUserId) {
                await deleteUser(selectedUserId);
                setUsers((prev) => prev.filter((user) => user.id !== selectedUserId));
                setSelectedUserId(null);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Erro ao deletar o usuário.', error);
        }
    };

    return {
        users,
        searchTerm,
        setSearchTerm,
        page,
        setPage,
        totalPages,
        totalItems,
        noResults,
        isModalOpen,
        setIsModalOpen,
        selectedUserId,
        setSelectedUserId,
        handleDelete,
    };
};
