import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    {
      username: 'Narahari',
      role: 'Student',
      status: 'Waiting for Approval from HoD...',
    },
  ]);

  useEffect(() => {
    console.log(document.cookie);
  });

  return (
    <div className="container">
      <div className="py-4">
        <h1>Complaints</h1>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <Link
                    className="btn btn-primary mr-2"
                    to={`/users/${user.id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
