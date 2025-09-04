import React, { useEffect, useMemo, useState } from 'react';
import { sectors } from '../data/mockData';
import { Users as UsersIcon, Building2, MessageSquare } from 'lucide-react';

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
  timings?: string;
  imageUrl?: string;
  status: string;
  createdAt: string;
}

interface ReviewItem {
  id: number;
  business: { id: number; businessName?: string; businessType?: string };
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'BUSINESSES' | 'REVIEWS' | 'USERS'>('BUSINESSES');
  const [businessStatusFilter, setBusinessStatusFilter] = useState<'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL'>('PENDING');
  const [allBusinesses, setAllBusinesses] = useState<Business[]>([]);
  const [editingBusinessId, setEditingBusinessId] = useState<number | null>(null);
  const [businessEditDraft, setBusinessEditDraft] = useState<Partial<Business & { openingTime: string; closingTime: string }>>({});
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const [activeReviewSector, setActiveReviewSector] = useState<string>('hotels');
  const [reviewsBySector, setReviewsBySector] = useState<Record<string, ReviewItem[]>>({});
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [reviewEditDraft, setReviewEditDraft] = useState<Partial<ReviewItem>>({});

  const approvedSummary = useMemo(() => {
    const byType: Record<string, { count: number; items: { name: string; type: string }[] }> = {};
    (allBusinesses || []).forEach(b => {
      if ((b.status || '').toUpperCase() === 'APPROVED') {
        const key = b.businessType || 'other';
        if (!byType[key]) byType[key] = { count: 0, items: [] };
        byType[key].count += 1;
        byType[key].items.push({ name: b.businessName, type: b.businessType });
      }
    });
    return byType;
  }, [allBusinesses]);

  useEffect(() => {
    if (activeTab !== 'USERS') return; // lazy load only on Users tab
    fetch('http://localhost:8080/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [activeTab]);

  const fetchAllBusinesses = async (status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL') => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status !== 'ALL') params.append('status', status);
    try {
      const res = await fetch(`http://localhost:8080/api/businesses?${params.toString()}`);
      const data = await res.json();
      setAllBusinesses(data);
    } catch {
      setAllBusinesses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab !== 'BUSINESSES') return;
    fetchAllBusinesses(businessStatusFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, businessStatusFilter]);

  const fetchReviews = async (sectorId: string) => {
    setLoading(true);
    const q = sectorId ? `?sector=${encodeURIComponent(sectorId)}` : '';
    try {
      const res = await fetch(`http://localhost:8080/api/reviews${q}`);
      const data = await res.json();
      setReviewsBySector(prev => ({ ...prev, [sectorId]: data }));
    } catch {
      setReviewsBySector(prev => ({ ...prev, [sectorId]: [] }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab !== 'REVIEWS') return;
    fetchReviews(activeReviewSector);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, activeReviewSector]);

  const handleApprove = async (id: number) => {
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/businesses/${id}/approve`, { method: 'PUT' });
      if (!res.ok) throw new Error('Failed to approve');
      // Optimistically remove from local list if we are filtering PENDING
      setAllBusinesses(prev => prev.filter(b => b.id !== id));
      if (activeTab === 'BUSINESSES') fetchAllBusinesses(businessStatusFilter);
    } catch (err: any) {
      // Even if the request failed (e.g., due to network/email), try to refresh list
      if (activeTab === 'BUSINESSES') fetchAllBusinesses(businessStatusFilter);
      setError(err.message || 'Error approving business');
    }
  };

  const handleReject = async (id: number) => {
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/businesses/${id}/reject`, { method: 'PUT' });
      if (!res.ok) throw new Error('Failed to reject');
      setAllBusinesses(prev => prev.filter(b => b.id !== id));
      if (activeTab === 'BUSINESSES') fetchAllBusinesses(businessStatusFilter);
    } catch (err: any) {
      if (activeTab === 'BUSINESSES') fetchAllBusinesses(businessStatusFilter);
      setError(err.message || 'Error rejecting business');
    }
  };

  const startEditBusiness = (biz: Business) => {
    setEditingBusinessId(biz.id);
    const [openingTime, closingTime] = biz.timings?.split(' - ') || ['', ''];
    setBusinessEditDraft({ ...biz, openingTime, closingTime });
    setSelectedImageFile(null); // Clear any previously selected image
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImageFile(e.target.files[0]);
    }
  };

  const saveBusinessEdits = async () => {
    if (!editingBusinessId) return;
    setError(null);
    const formDataToSend = new FormData();

    // Combine opening and closing times
    const timings = `${businessEditDraft.openingTime} - ${businessEditDraft.closingTime}`;
    formDataToSend.append('timings', timings);

    // Add other text fields
    if (businessEditDraft.phone) formDataToSend.append('phone', businessEditDraft.phone);
    if (businessEditDraft.services) formDataToSend.append('services', businessEditDraft.services);
    if (businessEditDraft.address) formDataToSend.append('address', businessEditDraft.address);
    if (businessEditDraft.businessName) formDataToSend.append('businessName', businessEditDraft.businessName);
    formDataToSend.append('status', businessEditDraft.status || ''); // Always send status, default to empty string if null/undefined

    // Handle image upload
    if (selectedImageFile) {
      formDataToSend.append('image', selectedImageFile);
    } else if (businessEditDraft.imageUrl) {
      // If no new image selected, but existing image URL, send it as a string
      // The backend needs to distinguish between a new upload and retaining an old one.
      // For simplicity, we'll just send the URL and backend will handle it.
      formDataToSend.append('imageUrl', businessEditDraft.imageUrl);
    }

    try {
      const res = await fetch(`http://localhost:8080/api/businesses/${editingBusinessId}`, {
        method: 'PUT',
        body: formDataToSend // Browser will set Content-Type: multipart/form-data
      });
      if (!res.ok) throw new Error('Failed to update business');
      setEditingBusinessId(null);
      setSelectedImageFile(null); // Clear selected file after successful upload
      fetchAllBusinesses(businessStatusFilter);
    } catch (err: any) {
      setError(err.message || 'Error updating business');
    }
  };

  // Delete action intentionally removed for Business Submissions

  const startEditReview = (rev: ReviewItem) => {
    setEditingReviewId(rev.id);
    setReviewEditDraft({ rating: rev.rating, comment: rev.comment });
  };

  const saveReviewEdits = async () => {
    if (!editingReviewId) return;
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/reviews/${editingReviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewEditDraft)
      });
      if (!res.ok) throw new Error('Failed to update review');
      setEditingReviewId(null);
      fetchReviews(activeReviewSector);
    } catch (err: any) {
      setError(err.message || 'Error updating review');
    }
  };

  const deleteReview = async (id: number) => {
    if (!confirm('Delete this review?')) return;
    setError(null);
    try {
      const res = await fetch(`http://localhost:8080/api/reviews/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete review');
      fetchReviews(activeReviewSector);
    } catch (err: any) {
      setError(err.message || 'Error deleting review');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-8 px-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="w-full max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            onClick={() => {
              localStorage.removeItem('isAdmin');
              window.location.href = '/admin/login';
            }}
          >
            Logout
          </button>
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => setActiveTab('BUSINESSES')}
            className={`group rounded-2xl border transition-all shadow-sm hover:shadow-md p-6 text-left bg-white dark:bg-gray-800 ${activeTab === 'BUSINESSES' ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900/30' : 'border-gray-200 dark:border-gray-700'}`}
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeTab === 'BUSINESSES' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200'}`}>
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-300">Manage</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Business Submissions</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Approve, edit and delete submitted businesses</p>
          </button>

          <button
            onClick={() => setActiveTab('REVIEWS')}
            className={`group rounded-2xl border transition-all shadow-sm hover:shadow-md p-6 text-left bg-white dark:bg-gray-800 ${activeTab === 'REVIEWS' ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900/30' : 'border-gray-200 dark:border-gray-700'}`}
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeTab === 'REVIEWS' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200'}`}>
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-300">Moderate</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Ratings & Comments</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Review, edit and delete user feedback</p>
          </button>

          <button
            onClick={() => setActiveTab('USERS')}
            className={`group rounded-2xl border transition-all shadow-sm hover:shadow-md p-6 text-left bg-white dark:bg-gray-800 ${activeTab === 'USERS' ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-900/30' : 'border-gray-200 dark:border-gray-700'}`}
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeTab === 'USERS' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200'}`}>
                <UsersIcon className="w-6 h-6" />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-300">View</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Registered Users</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">View all registered accounts</p>
          </button>
        </div>

        {activeTab === 'USERS' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 mb-8 transition-opacity">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Registered Users</h2>
            <div className="mb-2 text-gray-700 dark:text-gray-300">Total Registered Users: {users.length}</div>
            <div className="overflow-auto">
              <table className="min-w-[400px] w-full bg-white dark:bg-gray-900">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">ID</th>
                    <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Name</th>
                    <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{user.id}</td>
                      <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{user.fullName}</td>
                      <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'BUSINESSES' && (
          <div className="w-full max-w-7xl">
            {error && <div className="mb-4 text-red-500 dark:text-red-400">{error}</div>}
            <div className="flex items-center justify-between mb-4">
              <div />
              <div>
                <select
                  className="border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                  value={businessStatusFilter}
                  onChange={e => setBusinessStatusFilter(e.target.value as any)}
                >
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="ALL">All</option>
                </select>
              </div>
            </div>

            {/* Approved summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {Object.entries(approvedSummary).map(([type, info]) => (
                <div key={type} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">{type.charAt(0).toUpperCase() + type.slice(1)}</h4>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{info.count} approved</span>
                  </div>
                  <ul className="mt-2 text-sm text-gray-700 dark:text-gray-300 max-h-40 overflow-auto list-disc list-inside">
                    {info.items.map((it, idx) => (
                      <li key={idx}>{it.name} <span className="text-gray-500 dark:text-gray-400">({it.type})</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {loading ? (
              <div>Loading businesses...</div>
            ) : (
              <table className="min-w-full bg-white dark:bg-gray-900 shadow rounded overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">Business Name</th>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">Type</th>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">Phone</th>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">Services</th>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">Address</th>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">Timings</th>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">Image</th>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">Status</th>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">Submitted By</th>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allBusinesses.map(biz => (
                    <tr key={biz.id} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                        {editingBusinessId === biz.id ? (
                          <input
                            className="border px-2 py-1 rounded w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                            value={businessEditDraft.businessName || ''}
                            onChange={e => setBusinessEditDraft(prev => ({ ...prev, businessName: e.target.value }))}
                          />
                        ) : (
                          biz.businessName
                        )}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">{biz.businessType}</td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                        {editingBusinessId === biz.id ? (
                          <input
                            className="border px-2 py-1 rounded w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                            value={businessEditDraft.phone || ''}
                            onChange={e => setBusinessEditDraft(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        ) : (
                          biz.phone
                        )}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                        {editingBusinessId === biz.id ? (
                          <textarea
                            className="border px-2 py-1 rounded w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                            value={businessEditDraft.services || ''}
                            onChange={e => setBusinessEditDraft(prev => ({ ...prev, services: e.target.value }))}
                          />
                        ) : (
                          biz.services
                        )}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                        {editingBusinessId === biz.id ? (
                          <textarea
                            className="border px-2 py-1 rounded w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                            value={businessEditDraft.address || ''}
                            onChange={e => setBusinessEditDraft(prev => ({ ...prev, address: e.target.value }))}
                          />
                        ) : (
                          biz.address
                        )}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                        {editingBusinessId === biz.id ? (
                          <div className="flex space-x-2">
                            <input
                              type="time"
                              className="border px-2 py-1 rounded w-1/2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                              value={businessEditDraft.openingTime || ''}
                              onChange={e => setBusinessEditDraft(prev => ({ ...prev, openingTime: e.target.value }))}
                            />
                            <input
                              type="time"
                              className="border px-2 py-1 rounded w-1/2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                              value={businessEditDraft.closingTime || ''}
                              onChange={e => setBusinessEditDraft(prev => ({ ...prev, closingTime: e.target.value }))}
                            />
                          </div>
                        ) : (
                          biz.timings || 'N/A'
                        )}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                        {editingBusinessId === biz.id ? (
                          <div className="flex flex-col items-center space-y-2">
                            {selectedImageFile ? (
                              <img src={URL.createObjectURL(selectedImageFile)} alt="Preview" className="w-16 h-16 object-cover rounded-md" />
                            ) : biz.imageUrl ? (
                              <img src={biz.imageUrl} alt="Current" className="w-16 h-16 object-cover rounded-md" />
                            ) : (
                              'No Image'
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageFileChange}
                              className="text-sm text-gray-900 dark:text-gray-100"
                            />
                          </div>
                        ) : (
                          biz.imageUrl ? <img src={biz.imageUrl} alt="Business" className="w-10 h-10 object-cover rounded-md" /> : 'N/A'
                        )}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                        {editingBusinessId === biz.id ? (
                          <select
                            className="border px-2 py-1 rounded bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                            value={businessEditDraft.status || biz.status}
                            onChange={e => setBusinessEditDraft(prev => ({ ...prev, status: e.target.value }))}
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="APPROVED">APPROVED</option>
                            <option value="REJECTED">REJECTED</option>
                          </select>
                        ) : (
                          biz.status
                        )}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">{biz.fullName} ({biz.email})</td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 space-x-2">
                        {editingBusinessId === biz.id ? (
                          <>
                            <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700" onClick={saveBusinessEdits}>Save</button>
                            <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600" onClick={() => setEditingBusinessId(null)}>Cancel</button>
                          </>
                        ) : (
                          <>
                            {biz.status === 'PENDING' && (
                              <>
                                <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700" onClick={() => handleApprove(biz.id)}>Approve</button>
                                <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700" onClick={() => handleReject(biz.id)}>Reject</button>
                              </>
                            )}
                            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700" onClick={() => startEditBusiness(biz)}>Edit</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'REVIEWS' && (
          <div className="w-full max-w-6xl">
            {error && <div className="mb-4 text-red-500 dark:text-red-400">{error}</div>}
            <div className="flex items-center justify-between mb-4">
              <div className="space-x-2">
                {sectors.map(s => (
                  <button
                    key={s.id}
                    className={`px-3 py-1 rounded ${activeReviewSector === s.id ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-gray-100'}`}
                    onClick={() => setActiveReviewSector(s.id)}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div>Loading reviews...</div>
            ) : (
              <table className="min-w-full bg-white dark:bg-gray-900 shadow rounded">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Business</th>
                    <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">User</th>
                    <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Rating</th>
                    <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Comment</th>
                    <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(reviewsBySector[activeReviewSector] || []).map(rev => (
                    <tr key={rev.id} className="border-t border-gray-200 dark:border-gray-700">
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">{rev.business?.businessName || rev.business?.id}</td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">{rev.userName} ({rev.userEmail})</td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                        {editingReviewId === rev.id ? (
                          <input
                            type="number"
                            min={1}
                            max={5}
                            className="border px-2 py-1 rounded w-20 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                            value={reviewEditDraft.rating ?? rev.rating}
                            onChange={e => setReviewEditDraft(prev => ({ ...prev, rating: parseInt(e.target.value || '0', 10) }))}
                          />
                        ) : (
                          rev.rating
                        )}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                        {editingReviewId === rev.id ? (
                          <input
                            className="border px-2 py-1 rounded w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                            value={reviewEditDraft.comment ?? rev.comment}
                            onChange={e => setReviewEditDraft(prev => ({ ...prev, comment: e.target.value }))}
                          />
                        ) : (
                          rev.comment
                        )}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 space-x-2">
                        {editingReviewId === rev.id ? (
                          <>
                            <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700" onClick={saveReviewEdits}>Save</button>
                            <button className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600" onClick={() => setEditingReviewId(null)}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700" onClick={() => startEditReview(rev)}>Edit</button>
                            <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700" onClick={() => deleteReview(rev.id)}>Delete</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;