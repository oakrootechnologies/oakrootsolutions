'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { getFormSubmissions, deleteFormSubmission, clearAllSubmissions, ContactFormSubmission } from '@/utils/formStorage';

export default function AdminPanel() {
  const [submissions, setSubmissions] = useState<ContactFormSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactFormSubmission | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    loadSubmissions();
    
    // Listen for storage changes (from other tabs)
    const handleStorageChange = () => {
      loadSubmissions();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Poll for updates every 2 seconds (in case same tab)
    const interval = setInterval(loadSubmissions, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const loadSubmissions = () => {
    const data = getFormSubmissions();
    setSubmissions(data);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      deleteFormSubmission(id);
      loadSubmissions();
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete ALL submissions? This cannot be undone.')) {
      clearAllSubmissions();
      loadSubmissions();
      setSelectedSubmission(null);
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesFilter = filter === 'all' || sub.query === filter;
    const matchesSearch = searchTerm === '' || 
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.query.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const uniqueServices = Array.from(new Set(submissions.map(s => s.query).filter(Boolean)));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Head>
        <title>Admin Panel - Contact Form Submissions</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-black">Admin Panel</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Contact Form Submissions ({submissions.length} total)
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={loadSubmissions}
                  className="px-4 py-2 bg-gray-200 text-black text-sm font-medium rounded hover:bg-gray-300 transition-colors"
                  title="Refresh submissions"
                >
                  ↻ Refresh
                </button>
                {submissions.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {/* Filters and Search */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by name, email, or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
                />
              </div>

              {/* Filter by Service */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
              >
                <option value="all">All Services</option>
                {uniqueServices.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submissions List */}
          {filteredSubmissions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-500 text-lg">No submissions found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* List View */}
              <div className="lg:col-span-1 space-y-3">
                {filteredSubmissions.map((submission, index) => (
                  <motion.div
                    key={submission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedSubmission(submission)}
                    className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer border-2 transition-all ${
                      selectedSubmission?.id === submission.id
                        ? 'border-black'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-black">{submission.name}</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(submission.id);
                        }}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        ×
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{submission.email}</p>
                    <p className="text-xs text-gray-500 mt-1">{submission.query || 'No service selected'}</p>
                    <p className="text-xs text-gray-400 mt-2">{formatDate(submission.submittedAt)}</p>
                  </motion.div>
                ))}
              </div>

              {/* Detail View */}
              <div className="lg:col-span-2">
                {selectedSubmission ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-lg shadow-sm p-6 md:p-8"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <h2 className="text-2xl font-bold text-black">Submission Details</h2>
                      <button
                        onClick={() => setSelectedSubmission(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Personal Info */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Name</p>
                            <p className="text-black font-medium">{selectedSubmission.name}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Email</p>
                            <p className="text-black font-medium">
                              <a href={`mailto:${selectedSubmission.email}`} className="hover:underline">
                                {selectedSubmission.email}
                              </a>
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Contact Number</p>
                            <p className="text-black font-medium">
                              <a href={`tel:${selectedSubmission.contact}`} className="hover:underline">
                                {selectedSubmission.contact}
                              </a>
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Preferred Time</p>
                            <p className="text-black font-medium">{selectedSubmission.preferredTime || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Business Info */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Business Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Service Interest</p>
                            <p className="text-black font-medium">{selectedSubmission.query || 'Not specified'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Website</p>
                            <p className="text-black font-medium">
                              {selectedSubmission.website ? (
                                <a
                                  href={selectedSubmission.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline"
                                >
                                  {selectedSubmission.website}
                                </a>
                              ) : (
                                'Not provided'
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* About Product/Company */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">About Product/Company</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-black whitespace-pre-wrap">{selectedSubmission.aboutProduct || 'No description provided'}</p>
                        </div>
                      </div>

                      {/* Submission Info */}
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          Submitted: {formatDate(selectedSubmission.submittedAt)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <p className="text-gray-400">Select a submission to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

