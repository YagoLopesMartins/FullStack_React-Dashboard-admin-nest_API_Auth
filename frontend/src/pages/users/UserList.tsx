import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/layouts/Layout.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Eye, Edit, Trash } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import UserDetail from "@/pages/users/UserDetail.tsx";
import TitleComponent from "@/components/TitleComponent.tsx";
import ModalDeleteComponet from "@/components/ModalDeleteComponet.tsx";
const UserList: React.FC = () => {
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [page, searchTerm]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users`, {
        params: {
          page: page,
          limit: 10,
          search: searchTerm,
        },
      });
      setUsers(response.data.data);
      setTotalPages(response.data.meta.totalPages);
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
    }
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const openModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/users/${selectedUserId}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedUserId)
      );
      closeModal();
    } catch (error) {
      setError("Erro ao deletar o usuário.");
    }
  };

  const openDetail = (userId) => {
    setSelectedUserId(userId);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedUserId(null);
  };

  return (
    <Layout>
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
          <Link to={"/users/add/"}>
            <Button className="bg-primary-400 text-white">
              Cadastrar Usuário
            </Button>
          </Link>
        </div>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
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
                          onClick={() =>
                            navigate(`/users/edit/${user.id.trim()}`)
                          }
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
            <ModalDeleteComponet
              isOpen={isModalOpen}
              onClose={closeModal}
              onDelete={handleDelete}
            />
            {isDetailOpen && (
              <UserDetail userId={selectedUserId} onClose={closeDetail} />
            )}
          </div>
        </Card>
        {/* Pagination controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg"
          >
            Anterior
          </button>
          <span>
            Página {page} de {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Próxima
          </button>
        </div>
      </div>
    </Layout>
  );
};
export default UserList;
