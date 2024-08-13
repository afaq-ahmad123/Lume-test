'use client'
import React, { useState, useMemo, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Dialog } from '@headlessui/react';
import dataset from '@/public/dataset.json';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    return dataset.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const Row = useCallback(({ index, style }) => {
    const item = filteredData[index];
    return (
      <div
        style={style}
        className="flex justify-between items-center p-2 border-b border-gray-200"
      >
        <div className="w-1/4 truncate">{item.name}</div>
        <div className="w-1/4 truncate">{item.email}</div>
        <div className="w-1/4 truncate">{item.phone}</div>
        <div className="w-1/4">
          <span
            className={`px-2 py-1 rounded-full text-white ${
              item.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'
            }`}
          >
            {item.gender}
          </span>
        </div>
        <button
          onClick={() => setSelectedCustomer(item)}
          className="text-blue-600 hover:underline"
        >
          …
        </button>
      </div>
    );
  }, [filteredData]);

  // Modal component to display customer details
  const CustomerDetailModal = ({ customer, onClose }) => (
    <Dialog
      open={!!customer}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {customer && (
          <>
						{/* Current data doesn't have img
            <img
              src={customer.profile_picture}
              alt={customer.name}
              className="w-full rounded-md mb-4"
            /> */}
            <h2 className="text-xl font-semibold mb-2">{customer.name}</h2>
            <p className="text-gray-700">Email: {customer.email}</p>
            <p className="text-gray-700">Phone: {customer.phone}</p>
            <p className="text-gray-700">Gender: {customer.gender}</p>
          </>
        )}
      </div>
    </Dialog>
  );

  return (
    <div className="p-6 w-full">
			<h1 className='text-xl text-center font-bold pb-4'>Customer List</h1>
      <input
        type="text"
        placeholder="Search by Name"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 bg-gray-100 p-2">
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Gender</div>
        </div>
        <List
          height={600}
          itemCount={filteredData.length}
          itemSize={50}
          width="100%"
        >
          {Row}
        </List>
      </div>
      <CustomerDetailModal
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
};

export default Dashboard;
