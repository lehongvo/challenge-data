"use client";

import { useState } from 'react';

const SearchPage = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Searching for:', query);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-center p-4 bg-white shadow-md">
        <form onSubmit={handleSearch} className="flex w-full max-w-lg">
          <input
            type="text"
            placeholder="Search Contract address, Challenge name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z" />
            </svg>
          </button>
        </form>
      </header>

      <main className="mt-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">Tanimoto Challenge</h1>
              <p className="text-gray-600">0x7F7e7Dd043DD7A70efed5c3f4C329180Fa9C3b95</p>
            </div>
            <div>
              <img src="/path/to/qr-code.png" alt="Challenge Contract QR" className="w-16 h-16" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center border p-2 rounded-lg">
              <span className="font-medium">Sponsor</span>
              <span>Hiro25</span>
              <img src="/path/to/qr-code.png" alt="Sponsor QR" className="w-8 h-8" />
            </div>
            <div className="flex justify-between items-center border p-2 rounded-lg">
              <span className="font-medium">Challenger</span>
              <span>hiro39</span>
              <img src="/path/to/qr-code.png" alt="Challenger QR" className="w-8 h-8" />
            </div>
          </div>
          <div className="border rounded-lg p-4 mt-4">
            <h2 className="text-lg font-bold mb-2">Challenge Information</h2>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Network</span>
                <span>Polygon</span>
              </div>
              <div className="flex justify-between">
                <span>Contract Address</span>
                <span>0x7F7e7Dd043DD7A70efed5c3f4C329180Fa9C3b95</span>
              </div>
              <div className="flex justify-between">
                <span>Challenge Name</span>
                <span>Tanimoto Challenge</span>
              </div>
              <div className="flex justify-between">
                <span>Sponsor</span>
                <span>0x4E447D8C831406E28128321FCDA0bAd603CA125d</span>
              </div>
              <div className="flex justify-between">
                <span>Challenger</span>
                <span>0x296F5c137b8940776f2E602c6213719bC60f3EF4</span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <span>Not Finished</span>
              </div>
              <div className="flex justify-between">
                <span>Challenge Start</span>
                <span>2024/04/28</span>
              </div>
              <div className="flex justify-between">
                <span>Challenge End</span>
                <span>2024/04/29</span>
              </div>
              <div className="flex justify-between">
                <span>Challenge days</span>
                <span>2 days</span>
              </div>
              <div className="flex justify-between">
                <span>Minimum achievement days</span>
                <span>1 day</span>
              </div>
              <div className="flex justify-between">
                <span>Achievement Ratio</span>
                <span>0%</              </div>
              <div className="flex justify-between">
                <span>Give up</span>
                <span>Yes (1)</span>
              </div>
              <div className="flex justify-between">
                <span>NFT</span>
                <span>Yes</span>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4 mt-4">
            <h2 className="text-lg font-bold mb-2">Step Data</h2>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>2024/04/28</span>
                <span>3,400 steps</span>
              </div>
              <div className="flex justify-between">
                <span>2024/04/29</span>
                <span>300 steps</span>
              </div>
              {/* Add more step data as necessary */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
