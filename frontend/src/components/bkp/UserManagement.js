// src/components/UserManagement.js
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { fetchUsers, fetchUserStats, createUser, updateUser, deleteUser } from '../services/userService';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ activeAdmins: 0, cancelledAdmins: 0, activeCommon: 0, cancelledCommon: 0 });
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', role: 'COMMON' });
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    loadUsers();
    loadUserStats();
  }, []);

  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };

  const loadUserStats = async () => {
    const statsData = await fetchUserStats();
    setStats(statsData);
    renderChart(statsData);
  };

  const renderChart = (data) => {
    const chartData = [
      { label: 'Active Admins', value: data.activeAdmins },
      { label: 'Cancelled Admins', value: data.cancelledAdmins },
      { label: 'Active Common', value: data.activeCommon },
      { label: 'Cancelled Common', value: data.cancelledCommon },
    ];

    const svg = d3.select('#chart').attr('width', 400).attr('height', 300);
    svg.selectAll('*').remove();

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(100);

    const arcs = svg
      .selectAll('g.arc')
      .data(pie(chartData))
      .enter()
      .append('g')
      .attr('class', 'arc')
      .attr('transform', 'translate(150, 150)');

    arcs
      .append('path')
      .attr('d', arc)
      .attr('fill', (d, i) => d3.schemeCategory10[i]);

    arcs
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => `${d.data.label}: ${d.data.value}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateOrUpdate = async () => {
    if (editUserId) {
      await updateUser(editUserId, newUser);
      setEditUserId(null);
    } else {
      await createUser(newUser);
    }
    setNewUser({ firstName: '', lastName: '', email: '', password: '', role: 'COMMON' });
    loadUsers();
    loadUserStats();
  };

  const handleEdit = (user) => {
    setNewUser(user);
    setEditUserId(user.id);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
    loadUserStats();
  };

  return (
    <div>
      <h2>User Management</h2>
      <div>
        <h3>Statistics</h3>
        <svg id="chart"></svg>
      </div>

      <div>
        <h3>{editUserId ? 'Edit User' : 'Create User'}</h3>
        <input name="firstName" placeholder="First Name" value={newUser.firstName} onChange={handleInputChange} />
        <input name="lastName" placeholder="Last Name" value={newUser.lastName} onChange={handleInputChange} />
        <input name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} />
        <input name="password" placeholder="Password" type="password" value={newUser.password} onChange={handleInputChange} />
        <select name="role" value={newUser.role} onChange={handleInputChange}>
          <option value="COMMON">Common</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button onClick={handleCreateOrUpdate}>{editUserId ? 'Update' : 'Create'}</button>
      </div>

      <div>
        <h3>User List</h3>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.firstName} {user.lastName} - {user.email} - {user.role}
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
