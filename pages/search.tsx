"use client";
import { useState } from 'react';
import QRCode from 'qrcode.react';

const SearchPage = () => {
    const defaultQrValue = '0x7F7e7Dd043DD7A70efed5c3f4C329180Fa9C3b95';
    const [query, setQuery] = useState('');
    const [qrValue, setQrValue] = useState(defaultQrValue);
    const [value, setValue] = useState(true);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching for:', query);
        setQrValue(query || defaultQrValue);
        if (query == "0x00000FC78106799b5b1dbD71f206d8f0218B28fe") {
            setValue(true)
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start pt">
            <div className="max-w-screen-xl  mx-auto p-4">
                <header className="flex justify-between items-center bg-white shadow-md ">
                    <form onSubmit={handleSearch} className="flex w-full">
                        <input
                            type="text"
                            placeholder="Search:  Sponse, Contract address, Challenge name"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            style={{ minWidth: '300px' }}
                        />
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z" />
                            </svg>
                        </button>
                    </form>
                </header>
                {/* -------- */}

                <div className="flex  flex-col items-center pt-10">
                    <div className="flex bg-white p-6 rounded-lg shadow-md items-center mb-8">
                        <div className="flex flex-col mr-4">
                            <h1 className="text-2xl font-bold">Tanimoto Challenge</h1>
                            <p className="text-gray-600">0x7F7e7Dd043DD7A70efed5c3f4C329180Fa9C3b95</p>
                        </div>
                        <div>
                            <QRCode value={qrValue} size={128} />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md w-full text-center pt-5">
                        <table className="w-full border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200 border-b border-gray-300">
                                    <th className="py-2 px-4 border-r border-gray-300">Role</th>
                                    <th className="py-2 px-4 border-r border-gray-300">Name</th>
                                    <th className="py-2 px-4 border-r border-gray-300">Address</th>
                                    <th className="py-2 px-4">QR Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-300">
                                    <td className="py-2 px-4 font-semibold border-r border-gray-300">Sponsor</td>
                                    <td className="py-2 px-4 border-r border-gray-300">Hiro25</td>
                                    <td className="py-2 px-4 border-r border-gray-300">0x4E447D8C63140E281283321FCDA0A603CA125d</td>
                                    <td className="py-2 px-4 flex justify-center items-center">
                                        <QRCode value="0x4E447D8C63140E281283321FCDA0A603CA125d" size={64} />
                                    </td>
                                </tr>
                                <tr>
                                    <th className="py-2 px-4 font-semibold border-r border-gray-300">Challenger</th>
                                    <td className="py-2 px-4 border-r border-gray-300">hiro39</td>
                                    <td className="py-2 px-4 border-r border-gray-300">0x2B6F5c137b89407762E602c82137196c603EF4</td>
                                    <td className="py-2 px-4 flex justify-center items-center">
                                        <QRCode value="0x2B6F5c137b89407762E602c82137196c603EF4" size={64} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex w-full mb-10  pt-5">
                    <div className="bg-white p-6 rounded-l-lg shadow-md flex-1">
                        <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center">Challenge Information</h2>
                        <table className="w-full">
                            <tbody>
                                <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">Network</td><td className="py-2 px-4">Polygon</td></tr>
                                <tr><td className="py-2 px-4 font-semibold">Contract Address</td><td className="py-2 px-4">0x7F7e7Dd043DD7A70efed5c3f4C329180Fa9C3b95</td></tr>
                                <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">Sponsor</td><td className="py-2 px-4">0x4E447D8C63140E281283321FCDA0A603CA125d</td></tr>
                                <tr><td className="py-2 px-4 font-semibold">Challenger</td><td className="py-2 px-4">0x296F5c137b89407762E602c82137196c603EF4</td></tr>
                                <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">Status</td><td className="py-2 px-4">Not Finished</td></tr>
                                <tr><td className="py-2 px-4 font-semibold">Challenge Start</td><td className="py-2 px-4">2024/04/28</td></tr>
                                <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">Challenge End</td><td className="py-2 px-4">2024/04/29</td></tr>
                                <tr><td className="py-2 px-4 font-semibold">Challenge days</td><td className="py-2 px-4">2 days</td></tr>
                                <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">Minimum achievement days</td><td className="py-2 px-4">1 day</td></tr>
                                <tr><td className="py-2 px-4 font-semibold">Achievement Ratio</td><td className="py-2 px-4">0%</td></tr>
                                <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">Give up</td><td className="py-2 px-4">Yes (1)</td></tr>
                                <tr><td className="py-2 px-4 font-semibold">NFT</td><td className="py-2 px-4">Yes</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white p-6 rounded-r-lg shadow-md flex-1">
                        <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center">Step Data</h2>
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 text-left">Date</th>
                                    <th className="py-2 px-4 text-left">Steps</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className="py-2 px-4">2024/04/28</td><td className="py-2 px-4">3,400 steps</td></tr>
                                <tr className="bg-gray-100"><td className="py-2 px-4">2024/04/29</td><td className="py-2 px-4">300 steps</td></tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="flex w-full mb-10 pt-5">
                    <div className="flex-1 pl-2">
                        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                            <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center">Deposit (ERC-20)</h2>
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4 text-left" colSpan={Number("2")}>Matic</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td className="py-2 px-4 font-semibold bg-gray-100">Initial</td><td className="py-2 px-4">5 Matic</td></tr>
                                    <tr><td className="py-2 px-4 font-semibold bg-gray-100">Additional</td><td className="py-2 px-4">5 Matic</td></tr>
                                    <tr><td className="py-2 px-4 font-semibold bg-gray-100">Total</td><td className="py-2 px-4">10 Matic</td></tr>
                                </tbody>
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4 text-left" colSpan={Number("2")}>TTJP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td className="py-2 px-4 font-semibold bg-gray-100">Initial</td><td className="py-2 px-4">100 TTJP</td></tr>
                                    <tr><td className="py-2 px-4 font-semibold bg-gray-100">Additional</td><td className="py-2 px-4">0 TTJP</td></tr>
                                    <tr><td className="py-2 px-4 font-semibold bg-gray-100">Total</td><td className="py-2 px-4">100 TTJP</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                            <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center">Dividend (Success)</h2>
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4 text-left">Address</th>
                                        <th className="py-2 px-4 text-left">Percentage</th>
                                        <th className="py-2 px-4 text-left">Matic</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td className="py-2 px-4 bg-gray-100">0x4E447D8C63140E281283321FCDA0A603CA125d</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">5 Matic</td></tr>
                                    <tr><td className="py-2 px-4 bg-gray-100">0x4E447D8C63140E281283321FCDA0A603CA125d</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">5Matic</td></tr>
                                    <tr><td className="py-2 px-4 font-semibold bg-gray-100">Total</td><td className="py-2 px-4">100%</td><td className="py-2 px-4">10 Matic</td></tr>
                                </tbody>
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4 text-left">Address</th>
                                        <th className="py-2 px-4 text-left">Percentage</th>
                                        <th className="py-2 px-4 text-left">TTJP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td className="py-2 px-4 bg-gray-100">0x4E447D8C63140E281283321FCDA0A603CA125d</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">50 TTJP</td></tr>
                                    <tr><td className="py-2 px-4 bg-gray-100">0x4E447D8C63140E281283321FCDA0A603CA125d</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">50 TTJP</td></tr>
                                    <tr><td className="py-2 px-4 font-semibold bg-gray-100">Total</td><td className="py-2 px-4">100%</td><td className="py-2 px-4">10 TTJP</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center">Dividend (Failure)</h2>
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4 text-left">Address</th>
                                        <th className="py-2 px-4 text-left">Percentage</th>
                                        <th className="py-2 px-4 text-left">Matic</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td className="py-2 px-4 bg-gray-100">0x4E447D8C63140E281283321FCDA0A603CA125d</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">5 Matic</td></tr>
                                    <tr><td className="py-2 px-4 bg-gray-100">0x4E447D8C63140E281283321FCDA0A603CA125d</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">5Matic</td></tr>
                                    <tr><td className="py-2 px-4 font-semibold bg-gray-100">Total</td><td className="py-2 px-4">100%</td><td className="py-2 px-4">10 Matic</td></tr>
                                </tbody>
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4 text-left">Address</th>
                                        <th className="py-2 px-4 text-left">Percentage</th>
                                        <th className="py-2 px-4 text-left">TTJP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td className="py-2 px-4 bg-gray-100">0x4E447D8C63140E281283321FCDA0A603CA125d</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">50 TTJP</td></tr>
                                    <tr><td className="py-2 px-4 bg-gray-100">0x4E447D8C63140E281283321FCDA0A603CA125d</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">50 TTJP</td></tr>
                                    <tr><td className="py-2 px-4 font-semibold bg-gray-100">Total</td><td className="py-2 px-4">100%</td><td className="py-2 px-4">10 TTJP</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex-1 pr-2">
                        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                            <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center">Deposit (NFT)</h2>
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4 text-left" colSpan={Number("3")}>ERC-721</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td className="py-2 px-4 font-semibold bg-gray-100">Contract Address</td><td className="py-2 px-4" colSpan={Number("2")}>0x296F5c137b89407762E60</td></tr>
                                    <tr>
                                        <td className="py-2 px-4 font-semibold bg-gray-100" rowSpan={Number("3")}>NFT1</td>
                                        <td className="py-2 px-4 font-semibold">Token ID</td>
                                        <td className="py-2 px-4">2</td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="py-2 px-4 font-semibold">Number of NFT</td>
                                        <td className="py-2 px-4">2</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 font-semibold">Destination</td>
                                        <td className="py-2 px-4">Challenger</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 font-semibold bg-gray-100" rowSpan={Number("3")}>NFT2</td>
                                        <td className="py-2 px-4 font-semibold">Token ID</td>
                                        <td className="py-2 px-4">0</td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="py-2 px-4 font-semibold">Number of NFT</td>
                                        <td className="py-2 px-4">2</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 font-semibold">Destination</td>
                                        <td className="py-2 px-4">Challenger</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Result (Success) */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center">Result (Success)</h2>
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4 text-left">Address</th>
                                        <th className="py-2 px-4 text-left">Percentage</th>
                                        <th className="py-2 px-4 text-left">Matic</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td className="py-2 px-4 bg-gray-100">Mr. A</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">5 Matic</td></tr>
                                    <tr><td className="py-2 px-4 bg-gray-100">Mr. B</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">5 Matic</td></tr>
                                    <tr><td className="py-2 px-4 font-semibold bg-gray-100">Total</td><td className="py-2 px-4">100%</td><td className="py-2 px-4">10 Matic</td></tr>
                                </tbody>
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4 text-left">Address</th>
                                        <th className="py-2 px-4 text-left">Percentage</th>
                                        <th className="py-2 px-4 text-left">TTJP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td className="py-2 px-4 bg-gray-100">Mr. A</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">50 TTJP</td></tr>
                                    <tr><td className="py-2 px-4 bg-gray-100">Mr. B</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">50 TTJP</td></tr>
                                    <tr><td className="py-2 px-4 font-semibold bg-gray-100">Total</td><td className="py-2 px-4">100%</td><td className="py-2 px-4">10 TTJP</td></tr>
                                </tbody>
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4 text-left" colSpan={Number("3")}>ERC-721</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td className="py-2 px-4 font-semibold bg-gray-100">Contract Address</td><td className="py-2 px-4" colSpan={Number("2")}>0x296F5c137b89407762E60</td></tr>
                                    <tr>
                                        <td className="py-2 px-4 font-semibold bg-gray-100" rowSpan={Number("2")}>NFT1</td>
                                        <td className="py-2 px-4 font-semibold">Token ID</td>
                                        <td className="py-2 px-4">2</td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="py-2 px-4 font-semibold">Destination</td>
                                        <td className="py-2 px-4">Challenger</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 font-semibold bg-gray-100" rowSpan={Number("3")}>NFT2</td>
                                        <td className="py-2 px-4 font-semibold">Token ID</td>
                                        <td className="py-2 px-4">0</td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="py-2 px-4 font-semibold">Number of NFT</td>
                                        <td className="py-2 px-4">2</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 px-4 font-semibold">Destination</td>
                                        <td className="py-2 px-4">Challenger</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* -------- */}
            </div>
        </div>
    );
};

export default SearchPage;