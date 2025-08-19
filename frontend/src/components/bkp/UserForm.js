import React, { useState, useEffect } from 'react';

function UserForm({ user, onRefresh, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'COMMON',
  });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = user.id ? 'PUT' : 'POST';
    const endpoint = user.id ? `/api/users/${user.id}` : '/api/users';

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    onRefresh();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Nome" />
      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Sobrenome" />
      <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input name="password" value={formData.password} onChange={handleChange} placeholder="Senha" type="password" />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="ADMIN">Admin</option>
        <option value="COMMON">Comum</option>
      </select>
      <button type="submit">{user.id ? 'Atualizar' : 'Criar'}</button>
    </form>
  );
}

export default UserForm;
