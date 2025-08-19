// import React, { useState, useEffect } from 'react';
// import UserList from './components/UserList';
// import UserChart from './components/UserChart';
//
// function App() {
//   const [users, setUsers] = useState([]);
//
//   // Função para buscar usuários da API
//   const fetchUsers = async () => {
//     const response = await fetch('/api/users');
//     const data = await response.json();
//     setUsers(data);
//   };
//
//   useEffect(() => {
//     fetchUsers();
//   }, []);
//
//   return (
//     <div>
//       <h1>Gerenciamento de Usuários</h1>
//       <UserChart users={users} />
//       <UserList users={users} onRefresh={fetchUsers} />
//     </div>
//   );
// }
//
// export default App;

// src/App.js
import React from 'react';
import UserManagement from './components/UserManagement';

function App() {
  return (
    <div className="App">
      <UserManagement />
    </div>
  );
}

export default App;

