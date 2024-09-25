import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '@/layouts/Layout.tsx'
import { Card, CardContent } from '@/components/ui/card.tsx'
import { Eye, Edit, Trash } from 'lucide-react'
import { Input } from '@/components/ui/input.tsx'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button.tsx'
import UserDetail from '@/pages/users/UserDetail.tsx'
import TitleComponent from '@/components/TitleComponent.tsx'
import ModalDeleteComponet from '@/components/ModalDeleteComponet.tsx'
import { Toaster } from '@/components/ui/toaster.tsx'
import { useToast } from '@/hooks/use-toast.ts'
import logoNoSearch from '@/assets/icons/svg/Group 47851.svg'

const UserList: React.FC = () => {
    const [users, setUsers] = useState([])

    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const [noResults, setNoResults] = useState(false)

    const { toast } = useToast()

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/users`, {
                params: {
                    page: page,
                    limit: 10,
                    search: searchTerm
                }
            })
            setUsers(response.data.data)
            setTotalPages(response.data.meta.totalPages)
            setTotalItems(response.data.meta.totalItems)
            setNoResults(response.data.data.length === 0)
        } catch (error) {
            console.error('Erro ao buscar usuário', error)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [page, searchTerm, itemsPerPage])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        setPage(1)
    }
    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1)
        }
    }

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value)
        setPage(1)
    }

    const openModal = (userId) => {
        setSelectedUserId(userId)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedUserId(null)
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/users/${selectedUserId}`)
            toast({
                title: 'Exclusão Realizada!',
                variant: 'success'
            })
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUserId))
            closeModal()
        } catch (error) {
            setError('Erro ao deletar o usuário.')
        }
    }

    const openDetail = (userId) => {
        setSelectedUserId(userId)
        setIsDetailOpen(true)
    }

    const closeDetail = () => {
        setIsDetailOpen(false)
        setSelectedUserId(null)
    }

    return (
        <Layout>
            <Toaster />
            <TitleComponent>Usuários</TitleComponent>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <Input
                        type="text"
                        placeholder="Pesquisa"
                        className="max-w-xs bg-white"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <Link to={'/users/add/'}>
                        <Button className="bg-primary-400 text-white">Cadastrar Usuário</Button>
                    </Link>
                </div>
                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        {noResults ? (
                            <CardContent>
                                <div className="flex flex-col justify-center items-center h-96 bg-white py-40">
                                    <img src={logoNoSearch} alt="Logo" className="max-w-full h-[350px] align- p-4" />
                                    <h1 className="font-bold p-2">Nenhum Resultado Encontrado</h1>
                                    <p>Não foi possível achar nenhum resultado para sua busca. </p>
                                    <p>Tente refazer a pesquisa para encontrar o que busca.</p>
                                </div>
                            </CardContent>
                        ) : (
                            <>
                                {users.length > 0 ? (
                                    <table className="min-w-full table-auto">
                                        <thead className="bg-black">
                                            <tr className="text-white">
                                                <th className="text-left px-4 py-2">Nome</th>
                                                <th className="text-right px-4 py-2">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr className="border-b" key={user.id}>
                                                    <td className="px-4 py-2 text-left">{user.name}</td>
                                                    <td className="px-4 py-2 text-right">
                                                        <button
                                                            className="text-black-500 mr-2"
                                                            onClick={() => openDetail(user.id)}
                                                        >
                                                            <Eye className="inline-block w-5 h-5" />
                                                        </button>
                                                        <button
                                                            className="text-black-500 mr-2"
                                                            onClick={() => navigate(`/users/edit/${user.id.trim()}`)}
                                                        >
                                                            <Edit className="inline-block w-5 h-5" />
                                                        </button>
                                                        <button
                                                            className="text-black-500"
                                                            onClick={() => openModal(user.id)}
                                                        >
                                                            <Trash className="inline-block w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="flex flex-col justify-center items-center h-96 bg-white">
                                        <h1 className="font-bold">Nenhum Usuário Registrado</h1>
                                        <p>Clique em "Cadastrar Usuário" para começar a cadastrar.</p>
                                    </div>
                                )}
                            </>
                        )}
                        <ModalDeleteComponet
                            isOpen={isModalOpen}
                            onClose={closeModal}
                            onDelete={handleDelete}
                            title={'Deseja excluir?'}
                            description={'O usuário será excluido.'}
                        />
                        {isDetailOpen && <UserDetail userId={selectedUserId} onClose={closeDetail} />}
                    </div>
                </Card>
                {/* Pagination controls */}
                <div className="flex justify-between mt-4">
                    <div className="text-gray-600">
                        <span>
                            Total de itens: <b>{totalItems}</b>
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="">
                            Itens por página <b>{itemsPerPage}</b>{' '}
                        </span>
                        <button
                            onClick={handlePrevPage}
                            disabled={page === 1}
                            className="text-black py-2 px-4 rounded-lg"
                        >
                            &lt;
                        </button>
                        <button className="bg-primary-400 text-white py-2 px-4 rounded-lg">
                            <b>{page}</b>
                        </button>
                        <button
                            onClick={handleNextPage}
                            disabled={page === totalPages}
                            className="text-black py-2 px-4 rounded-lg"
                        >
                            &gt;
                        </button>
                        <span className="">
                            <b>de {totalPages}</b>
                        </span>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default UserList
