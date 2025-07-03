import React, { useEffect, useState } from 'react';

interface User {
  id: string;
  fullName?: string;
  email: string;
  role?: string;
}

interface Business {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  services: string;
  address: string;
  status: string;
  createdAt: string;
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pendingBusinesses, setPendingBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const fetchPendingBusinesses = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/businesses?status=PENDING')
      .then(res => res.json())
      .then(data => setPendingBusinesses(data))
      .catch(() => setPendingBusinesses([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPendingBusinesses();
  }, []);

  const handleApprove = async (id: number) => {
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/businesses/${id}/approve`, { method: 'PUT' });
      if (!res.ok) throw new Error('Failed to approve');
      fetchPendingBusinesses();
    } catch (err: any) {
      setError(err.message || 'Error approving business');
    }
  };

  const handleReject = async (id: number) => {
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/businesses/${id}/reject`, { method: 'PUT' });
      if (!res.ok) throw new Error('Failed to reject');
      fetchPendingBusinesses();
    } catch (err: any) {
      setError(err.message || 'Error rejecting business');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Page</h1>
      <button
        className="mb-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={() => {
          localStorage.removeItem('isAdmin');
          window.location.href = '/admin/login';
        }}
      >
        Logout
      </button>
      <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
      <table className="min-w-[400px] bg-white shadow rounded mb-12">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Full Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.fullName}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role || 'USER'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-4">Pending Business Submissions</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {loading ? (
        <div>Loading pending businesses...</div>
      ) : pendingBusinesses.length === 0 ? (
        <div>No pending business submissions.</div>
      ) : (
        <table className="min-w-[600px] bg-white shadow rounded">
          <thead>
            <tr>
              <th className="px-4 py-2">Business Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Submitted By</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
          <tbody>
            {pendingBusinesses.map(biz => (
              <tr key={biz.id}>
                <td className="border px-4 py-2">{biz.businessName}</td>
                <td className="border px-4 py-2">{biz.businessType}</td>
                <td className="border px-4 py-2">{biz.fullName} ({biz.email})</td>
                <td className="border px-4 py-2">{biz.phone}</td>
                <td className="border px-4 py-2">{biz.status}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => handleApprove(biz.id)}
                  >
                    Approve
                      </button>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleReject(biz.id)}
                  >
                    Reject
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      )}
    </div>
  );
};

export default AdminPage;