import React, { useState } from 'react';
import UserForm from './UserForm';

function UserList({ users, onRefresh }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = async (userId) => {
    await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    onRefresh();
  };

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <button onClick={() => setSelectedUser({})}>Criar Novo Usuário</button>
      {selectedUser && (
        <UserForm user={selectedUser} onRefresh={onRefresh} onClose={() => setSelectedUser(null)} />
      )}
      <table>
        <thead>
        <tr>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Email</th>
          <th>Nível de Acesso</th>
          <th>Ações</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button onClick={() => setSelectedUser(user)}>Editar</button>
              <button onClick={() => handleDelete(user.id)}>Excluir</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
