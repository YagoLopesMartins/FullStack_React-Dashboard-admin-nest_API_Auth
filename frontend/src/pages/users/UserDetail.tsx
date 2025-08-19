import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'

interface UserUserDetailProps {
    userId: string
    onClose: () => void
}

interface User {
    id?: string
    name: string
    email?: string
    registration?: string
    password?: string
    createdAt: string
    updatedAt: string
}

const UserDetail: React.FC<UserUserDetailProps> = ({ userId, onClose }) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${userId}`)
                setUser(response.data)
            } catch (error) {
                console.error('Erro ao buscar usuário:', error)
            }
        }

        if (userId) {
            fetchUser()
        }
    }, [userId])

    return (
        <aside className="fixed top-0 right-0 w-96 h-full bg-white shadow-lg border-l border-gray-300 p-4">
            <div className=" flex flex-row ">
                <h2 className="text-2xl font-bold mb-2">Visualizar Usuário</h2>
                <button onClick={onClose} className="absolute top-6 right-6 text-gray-600 hover:text-gray-900">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>

            {user ? (
                <div>
                    <div className="flex items-center">
                        <span className="mx-4 text-gray-700 font-bold">Dados do Usuário</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <div className=" grid grid-cols-2 gap-4 p-4">
                        <div className="text-gray-700 ">
                            <p className="text-gray-700 mb-2">Nome </p>
                            <p>
                                <strong>{user.name}</strong>
                            </p>
                        </div>
                        <div className="text-gray-700">
                            <p className="text-gray-700 mb-2">Matrícula: </p>
                            <p>
                                <strong>{user.registration}</strong>
                            </p>
                        </div>
                    </div>
                    <div className="text-gray-700 p-4">
                        <p className="text-gray-700 mb-2">Email:</p>
                        <p>
                            <strong>{user.email}</strong>
                        </p>
                    </div>

                    <div className="flex items-center">
                        <span className="mx-4 text-gray-700 font-bold">Detalhes</span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    <div className=" grid grid-cols-2 gap-4 p-4">
                        <div className="text-gray-700 ">
                            <p className="text-gray-700 mb-2">Data de Criação: </p>
                            <p>
                                <strong>{new Date(user.createdAt).toLocaleDateString()}</strong>
                            </p>
                        </div>
                        <div className="text-gray-700">
                            <p className="text-gray-700 mb-2">Última edição: </p>
                            <p>
                                <strong>{new Date(user.updatedAt).toLocaleDateString()}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
            {/* Footer with close button */}
            <div className="flex justify-end p-4">
                <button
                    onClick={onClose}
                    className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-600 top-10 left-50"
                >
                    Fechar
                </button>
            </div>
        </aside>
    )
}

export default UserDetail
