"use client";
import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import Networks from '../utils/networks';
import { ethers } from 'ethers';
import ActAPC from '../utils/apiPrepare';
import numeral from 'numeral';
import ABI from '../utils/abiContract';

interface IGetListNftData {
    contractAddress: string;
    symbol: string;
    balance: number;
    listIndex: any[];
}

interface ReceiveData {
    percent: number;
    address: string;
}

interface Challenger {
    address: string;
    username: string;
    sponsorAddress: String,
    sponsorUsername: String,
    contractName: String,
    challengeAddress: String,
    startTime: number,
    endTime: number,
    challengeDays: Number,
    minimumAchievementDays: Number,
    dailySteps: any,
    generateNft: Boolean,
    giveUp: Boolean,
    arrayContainReward: any,
    getListNftData: IGetListNftData[],
    receiveSuccess: ReceiveData[],
    receiveFail: ReceiveData[],
}


const SearchPage = () => {
    const DefaultQrValue = '0x7F7e7Dd043DD7A70efed5c3f4C329180Fa9C3b95';
    const DefaultError = "Something went wrong";
    const DefaultNetwork = 2;
    const [query, setQuery] = useState('');
    const [queryTemp, setQueryTemp] = useState(DefaultQrValue);
    const [value, setValue] = useState<Challenger>(
        {
            username: "Dev",
            address: "0x00000FC78106799b5b1dbD71f206d8f0218B28fe",
            sponsorAddress: "0x00000FC78106799b5b1dbD71f206d8f0218B28fe",
            sponsorUsername: "sponsorUsername",
            contractName: "Contract address",
            challengeAddress: "0x00000FC78106799b5b1dbD71f206d8f0218B28fe",
            startTime: Math.ceil(new Date().getTime() / 1000 - 60 * 60 * 24),
            endTime: Math.ceil(new Date().getTime() / 1000),
            challengeDays: 10,
            minimumAchievementDays: 10,
            dailySteps: [
                {
                    "id": 13158,
                    "challenge_id": 6675,
                    "timestamp": "1715957998",
                    "step": 5912,
                    "hash": "0x5e6bcaf78271bbd2158ffc5f322fccc85f6cf411845ce2e7f9b0efc90c56d864",
                    "status": 1,
                    "created_at": "2024-05-18T03:24:14.000Z",
                    "updated_at": "2024-05-18T03:24:33.000Z",
                    "list_gacha": [
                        "0x27d3969a77FDde1c503d5296b6dF101a785d214B"
                    ],
                    "is_cheering": 0
                },

                {
                    "id": 13158,
                    "challenge_id": 6675,
                    "timestamp": "1718967998",
                    "step": 5912,
                    "hash": "0x5e6bcaf78271bbd2158ffc5f322fccc85f6cf411845ce2e7f9b0efc90c56d864",
                    "status": 1,
                    "created_at": "2024-05-18T03:24:14.000Z",
                    "updated_at": "2024-05-18T03:24:33.000Z",
                    "list_gacha": [
                        "0x27d3969a77FDde1c503d5296b6dF101a785d214B"
                    ],
                    "is_cheering": 0
                },
                {
                    "id": 13158,
                    "challenge_id": 6675,
                    "timestamp": "1717977998",
                    "step": 5912,
                    "hash": "0x5e6bcaf78271bbd2158ffc5f322fccc85f6cf411845ce2e7f9b0efc90c56d864",
                    "status": 1,
                    "created_at": "2024-05-18T03:24:14.000Z",
                    "updated_at": "2024-05-18T03:24:33.000Z",
                    "list_gacha": [
                        "0x27d3969a77FDde1c503d5296b6dF101a785d214B"
                    ],
                    "is_cheering": 0
                },
                {
                    "id": 13158,
                    "challenge_id": 6675,
                    "timestamp": "1716987998",
                    "step": 5912,
                    "hash": "0x5e6bcaf78271bbd2158ffc5f322fccc85f6cf411845ce2e7f9b0efc90c56d864",
                    "status": 1,
                    "created_at": "2024-05-18T03:24:14.000Z",
                    "updated_at": "2024-05-18T03:24:33.000Z",
                    "list_gacha": [
                        "0x27d3969a77FDde1c503d5296b6dF101a785d214B"
                    ],
                    "is_cheering": 0
                },
                {
                    "id": 13158,
                    "challenge_id": 6675,
                    "timestamp": "1715997998",
                    "step": 5912,
                    "hash": "0x5e6bcaf78271bbd2158ffc5f322fccc85f6cf411845ce2e7f9b0efc90c56d864",
                    "status": 1,
                    "created_at": "2024-05-18T03:24:14.000Z",
                    "updated_at": "2024-05-18T03:24:33.000Z",
                    "list_gacha": [
                        "0x27d3969a77FDde1c503d5296b6dF101a785d214B"
                    ],
                    "is_cheering": 0
                },
                {
                    "id": 13158,
                    "challenge_id": 6675,
                    "timestamp": "1715967998",
                    "step": 5912,
                    "hash": "0x5e6bcaf78271bbd2158ffc5f322fccc85f6cf411845ce2e7f9b0efc90c56d864",
                    "status": 1,
                    "created_at": "2024-05-18T03:24:14.000Z",
                    "updated_at": "2024-05-18T03:24:33.000Z",
                    "list_gacha": [
                        "0x27d3969a77FDde1c503d5296b6dF101a785d214B"
                    ],
                    "is_cheering": 0
                },
                {
                    "id": 13158,
                    "challenge_id": 6675,
                    "timestamp": "1715957998",
                    "step": 5912,
                    "hash": "0x5e6bcaf78271bbd2158ffc5f322fccc85f6cf411845ce2e7f9b0efc90c56d864",
                    "status": 1,
                    "created_at": "2024-05-18T03:24:14.000Z",
                    "updated_at": "2024-05-18T03:24:33.000Z",
                    "list_gacha": [
                        "0x27d3969a77FDde1c503d5296b6dF101a785d214B"
                    ],
                    "is_cheering": 0
                },
                {
                    "id": 13158,
                    "challenge_id": 6675,
                    "timestamp": "1715957998",
                    "step": 5912,
                    "hash": "0x5e6bcaf78271bbd2158ffc5f322fccc85f6cf411845ce2e7f9b0efc90c56d864",
                    "status": 1,
                    "created_at": "2024-05-18T03:24:14.000Z",
                    "updated_at": "2024-05-18T03:24:33.000Z",
                    "list_gacha": [
                        "0x27d3969a77FDde1c503d5296b6dF101a785d214B"
                    ],
                    "is_cheering": 0
                },
                {
                    "id": 13158,
                    "challenge_id": 6675,
                    "timestamp": "1715957998",
                    "step": 5912,
                    "hash": "0x5e6bcaf78271bbd2158ffc5f322fccc85f6cf411845ce2e7f9b0efc90c56d864",
                    "status": 1,
                    "created_at": "2024-05-18T03:24:14.000Z",
                    "updated_at": "2024-05-18T03:24:33.000Z",
                    "list_gacha": [
                        "0x27d3969a77FDde1c503d5296b6dF101a785d214B"
                    ],
                    "is_cheering": 0
                },
            ],
            generateNft: true,
            giveUp: false,
            arrayContainReward: [
                {
                    "symbol": "MATIC",
                    "before": 1,
                    "after": 0,
                },
                {
                    "symbol": "MATIC",
                    "before": 1,
                    "after": 0,
                }
            ],
            getListNftData: [
                {
                    contractAddress: "0x296F5c137b89407762E602c82137196c603EF4",
                    symbol: "MATIC",
                    balance: 1,
                    listIndex: []
                },
                {
                    contractAddress: "0x296F5c137b89407762E602c82137196c603EF4",
                    symbol: "MATIC",
                    balance: 1,
                    listIndex: []
                }
            ],
            receiveSuccess: [
                {
                    percent: 100,
                    address: "0x296F5c137b89407762E602c82137196c603EF4"
                }
            ],
            receiveFail: [
                {
                    percent: 100,
                    address: "0x27d3969a77FDde1c503d5296b6dF101a785d214B"
                }
            ]
            
        }
    );
    const [selectedNetwork, setSelectedNetwork] = useState(DefaultNetwork);
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(DefaultError);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (e: any) => {
        try {
            e.preventDefault();

            if (query.length <= 0) {
                setIsOpen(true);
                setErrorMessage("Please enter a valid address");
                return
            }

            if (!ethers.utils.isAddress(query)) {
                setIsOpen(true);
                setErrorMessage("Invalid ethereum address");
                return
            }
            const networkData = Networks[selectedNetwork];
            const provider = new ethers.providers.JsonRpcProvider(networkData.RPC);


            const code = await provider.getCode(query);
            if (code === "0x") {
                setIsOpen(true);
                setErrorMessage("This address is not a contract or wrong network, Please check your network configuration");
                return
            }

            setIsLoading(true)

            const [challengeStatus, objectData, listNftData] = await Promise.all(
                [
                    ActAPC.GetStatusChallenge(query.toString(), provider),
                    ActAPC.PrepareApi(query.toString(), Number(networkData.id)),
                    ActAPC.GetListNftData(query.toString(), provider)
                ]
            )

            let historyTokenAndCoin = challengeStatus ?
                await ActAPC.scanHistoryChallenge(
                    networkData.RPC,
                    query.toString(),
                    getHash(objectData.data.daily_steps, objectData.data.giveup_hash)
                ) :
                await ActAPC.getHistoryTokenAndCoin(
                    networkData.historyBalanceChallengesContract,
                    networkData.RPC,
                    query.toString()
                );
            let arrayContainRewardVal = [];
            if ('coinBefore' in historyTokenAndCoin && 'coinAfter' in historyTokenAndCoin) {
                if(Number(historyTokenAndCoin.coinAfter) + Number(historyTokenAndCoin.coinBefore!) > 0) {
                    arrayContainRewardVal.push(
                        {
                            "symbol": networkData.symbol,
                            "before": historyTokenAndCoin.coinBefore!,
                            "after": historyTokenAndCoin.coinAfter,
                        }
                    )
                }
                
                historyTokenAndCoin.listTokenAfter.forEach((item: any, i: number) => {
                    if(Number(item.value) + Number(historyTokenAndCoin.listTokenBefore[i].value) > 0) {
                        arrayContainRewardVal.push({
                            "symbol": item.name,
                            "before": historyTokenAndCoin.listTokenBefore[i].value,
                            "after": item.value,
                        })
                    } 
                })
            }

            let totalPercent: number = 0;
            let listDataSuccess: ReceiveData[] = [];
            let listDataFailed: ReceiveData[] = [];
            objectData.data.receivers.forEach((item: any) => {
                totalPercent += Number(item.percent);
                const singleData: ReceiveData = {
                        percent: Number(item.percent),
                        address: item.address
                }
                if (totalPercent <= 100) {
                    listDataSuccess.push(singleData)
                } else {
                    listDataFailed.push(singleData)
                }
            })
            console.log("listDataSuccess", listDataSuccess)
            console.log("listDataFailed", listDataFailed)



            setQuery(query.toString())
            setValue(
                {
                    username: objectData.data.challenger.username,
                    address: objectData.data.challenger_wallet.address,
                    sponsorUsername: objectData.data.sponsor.username,
                    sponsorAddress: objectData.data.sponsor_wallet.address,
                    contractName: objectData.data.name,
                    challengeAddress: query.toString(),
                    startTime: Number(objectData.data.date_start),
                    endTime: Number(objectData.data.date_end),
                    challengeDays: Number(objectData.data.execute_time),
                    minimumAchievementDays: Number(objectData.data.min_day_require),
                    dailySteps: objectData.data.daily_steps,
                    generateNft: objectData.data.generate_nft == 1 ? true : false,
                    giveUp: objectData.data.give_up == 1 ? true : false,
                    arrayContainReward: arrayContainRewardVal,
                    getListNftData: listNftData,
                    receiveSuccess: [],
                    receiveFail: []
                }
            );

            setIsLoading(false)
        } catch (error) {
            console.log("error", error)
            setQuery("")
            setIsOpen(true);
            setErrorMessage((error as Error).message ? (error as Error).message : DefaultError);
            setIsLoading(false)
        };
    }

    const checkTime = (startTime: number, endTime: number) => {
        if (
            startTime < Math.ceil(new Date().getTime() / 1000) &&
            endTime > Math.ceil(new Date().getTime() / 1000)
        ) {
            return true
        }
        return false
    }

    const formatTimestamp = (timestamp: any) => {
        const date = new Date(timestamp * 1000);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}/${month}/${day}`;
    }

    const getRatioProcessing = (dailySteps: any) => {
        if (dailySteps.length > 0) {
            const ratio = dailySteps.length * 100 / Number(value.challengeDays);
            return (ratio.toFixed(2)).toString()
        }

        return "0.00"
    }

    const getHash = (dataChallenge: Array<any>, giveup_hash: string) => {
        const index = dataChallenge.length - 1;
        const newHash = dataChallenge[index].hash;
        const hash = giveup_hash != null ? giveup_hash : newHash
        return hash;
    }

    const hideModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start  ">
            {
                isLoading && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-full px-6 py-4 flex items-center space-x-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-4 border-blue-500 border-t-transparent"></div>
                        <p className="text-gray-700 font-semibold">Loading...</p>
                    </div>
                </div>
            }

            <div className="w-full flex-col mx-auto p-">
                <header className="flex overflow-x-auto justify-between items-center bg-white shadow-md rounded-lg">
                    <div className="w-full">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Search: Sponse, Contract address, Challenge name"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-grow p-1 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:min-w-[300px]"
                            />

                            <select
                                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 sm:px-4 sm:py-2"
                                value={selectedNetwork}
                                onChange={(e) =>
                                    setSelectedNetwork(Number(e.target.value))
                                }
                            >
                                {Networks.map((network, index) => (
                                    <option key={index} value={index}>{network.name}</option>
                                ))}
                            </select>

                            <button
                                type="submit"
                                onClick={handleSearch}
                                className="ml-[0.2%] px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 sm:px-4 sm:py-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                </header>

                <div className="flex flex-col md:flex-row bg-white p-3 rounded-lg items-center justify-center mb-8">
                    <div className="p-6 rounded-lg shadow-md justify-center items-center flex ">
                        <div className="flex flex-col mr-4 ">
                            <h1 className="text-2xl font-bold text-center md:text-left">{value.contractName}</h1>
                            <p className="text-gray-600 hidden md:block">{query ? query : queryTemp}</p>
                        </div>
                        <div className="flex justify-center md:justify-end">
                            <QRCode value={query ? query : queryTemp} size={128} className="max-w-full max-h-full" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md mb-8">
                    <table className="w-full">
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
                                <td className="py-2 px-4 border-r border-gray-300">{value.sponsorUsername}</td>
                                <td className="py-2 px-4 border-r border-gray-300 truncate max-w-xs">{value.sponsorAddress}</td>
                                <td className="py-2 px-4">
                                    <div className="flex justify-center">
                                        <QRCode value="0x4E447D8C63140E281283321FCDA0A603CA125d" size={64} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="py-2 px-4 font-semibold border-r border-gray-300">Challenger</td>
                                <td className="py-2 px-4 border-r border-gray-300">{value.username}</td>
                                <td className="py-2 px-4 border-r border-gray-300 truncate max-w-xs">{value.address}</td>
                                <td className="py-2 px-4">
                                    <div className="flex justify-center">
                                        <QRCode value="0x2B6F5c137b89407762E602c82137196c603EF4" size={64} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col md:flex-row w-full mb-10 pt-5">
                    <div className="bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4 md:w-1/2">
                        <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center rounded-md">Challenge Information</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <tbody>
                                    <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">Network</td><td className="py-2 px-4">{Networks[selectedNetwork].name}</td></tr>
                                    <tr><td className="py-2 px-4 font-semibold">Contract Address</td><td className="py-2 px-4 truncate">{value.challengeAddress}</td></tr>
                                    <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">Sponsor</td><td className="py-2 px-4 truncate">{value.sponsorAddress}</td></tr>
                                    <tr><td className="py-2 px-4 font-semibold">Challenger</td><td className="py-2 px-4 truncate">{value.address}</td></tr>
                                    <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">Status</td><td className="py-2 px-4">{checkTime(value.startTime, value.endTime) ? "Not Finished" : "Finished"}</td></tr>
                                    <tr><td className="py-2 px-4 font-semibold">Challenge Start</td><td className="py-2 px-4">{formatTimestamp(value.startTime)}</td></tr>
                                    <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">Challenge End</td><td className="py-2 px-4">{formatTimestamp(value.endTime)}</td></tr>
                                    <tr><td className="py-2 px-4 font-semibold">Challenge days</td><td className="py-2 px-4">{value.challengeDays.toString()} days</td></tr>
                                    <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">Minimum achievement days</td><td className="py-2 px-4">{value.minimumAchievementDays.toString()} day</td></tr>
                                    <tr><td className="py-2 px-4 font-semibold">Achievement Ratio</td><td className="py-2 px-4">{getRatioProcessing(value.dailySteps)}%</td></tr>
                                    <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">Give up</td><td className="py-2 px-4">{value.giveUp ? "Yes" : "No"} (1)</td></tr>
                                    <tr><td className="py-2 px-4 font-semibold">NFT</td><td className="py-2 px-4">{value.generateNft ? "Yes" : "No"}</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md md:w-1/2">
                        <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center rounded-md">Step Data</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="py-2 px-4 text-center">Date</th>
                                        <th className="py-2 px-4 text-center">Steps</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        value.dailySteps.map((item: any, index: number) => (
                                            <tr  key={index}><td className="py-2 px-4 text-center">{formatTimestamp(item.timestamp)}</td><td className="py-2 px-4 text-center">{numeral(item.step).format('0,0')} steps</td></tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col overflow-x-auto md:flex-row w-full mb-10 pt-5">
                    <div className="w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
                        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                            <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center rounded-md">Deposit (Coin/ERC-20)</h2>
                            <table className="w-full">
                                {value.arrayContainReward.map((item: any, index: number) => (
                                    <>
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="py-2 px-4 text-left" colSpan={Number("2")}>{item.symbol}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td className="py-2 px-4 font-semibold bg-gray-100">Initial</td><td className="py-2 px-4">{item.before} {item.symbol}</td></tr>
                                            <tr><td className="py-2 px-4 font-semibold bg-gray-100">Additional</td><td className="py-2 px-4">{item.after} {item.symbol}</td></tr>
                                            <tr><td className="py-2 px-4 font-semibold bg-gray-100">Total</td><td className="py-2 px-4">{item.after + item.before} {item.symbol}</td></tr>
                                        </tbody>
                                    </>
                                ))}
                            </table>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                            <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center rounded-md">Dividend (Success)</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                {value.arrayContainReward.map((item: any, index: number) => (
                                    <>
                                        <thead>
                                            <tr className="bg-gray-200">
                                                <th className="py-2 px-4 text-left">Address</th>
                                                <th className="py-2 px-4 text-left">Percentage</th>
                                                <th className="py-2 px-4 text-left">Symbol</th>
                                            </tr>
                                        </thead>
                                         {/* value = 0;
                                        {value.receiveData.map((item: any, index: number) => (
                                            value += item.percent
                                            if(value <= 100)
                                            <tbody>
                                                <tr><td className="py-2 px-4 bg-gray-100 whitespace-nowrap">0x4E447D8C63140E281283321FCDA0A603CA125d</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">5 Matic</td></tr>
                                            </tbody> 
                                        ))}
                                        <tr><td className="py-2 px-4 font-semibold bg-gray-100">Total</td><td className="py-2 px-4">100%</td><td className="py-2 px-4">10 Matic</td></tr> */}
                                    </>
                                ))}
                                </table>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center rounded-md">Dividend (Failure)</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="py-2 px-4 text-left">Address</th>
                                            <th className="py-2 px-4 text-left">Percentage</th>
                                            <th className="py-2 px-4 text-left">Matic</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td className="py-2 px-4 bg-gray-100 whitespace-nowrap">0x4E447D8C63140E281283321FCDA0A603CA125d</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">5 Matic</td></tr>
                                        <tr><td className="py-2 px-4 bg-gray-100 whitespace-nowrap">0x4E447D8C63140E281283321FCDA0A603CA125d</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">5 Matic</td></tr>
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
                                        <tr><td className="py-2 px-4 bg-gray-100 whitespace-nowrap">0x4E447D8C63140E281283321FCDA0A603CA125d</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">50 TTJP</td></tr>
                                        <tr><td className="py-2 px-4 bg-gray-100 whitespace-nowrap">0x4E447D8C63140E281283321FCDA0A603CA125d</td><td className="py-2 px-4">50%</td><td className="py-2 px-4">50 TTJP</td></tr>
                                        <tr><td className="py-2 px-4 font-semibold bg-gray-100">Total</td><td className="py-2 px-4">100%</td><td className="py-2 px-4">10 TTJP</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 md:pl-2">
                        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                            <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center rounded-md">Deposit (NFT)</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="py-2 px-4 text-left" colSpan={3}>ERC-721</th>
                                        </tr>
                                    </thead>
                                
                                    {value.getListNftData.map((item: any, index: number) => (
                                        <tbody key={index}>
                                            <tr>
                                                <td className="py-2 px-4 font-semibold bg-gray-100">Collection</td>
                                                <td className="py-2 px-4 whitespace-nowrap" colSpan={2}>{item.contractAddress}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-4 font-semibold bg-gray-100" rowSpan={3}>{item.symbol}</td>
                                                <td className="py-2 px-4 font-semibold">Token ID</td>
                                                <td className="py-2 px-4">{item.listIndex.length > 0 ? item.listIndex : "None"}</td>
                                            </tr>
                                            <tr className="bg-gray-100">
                                                <td className="py-2 px-4 font-semibold">Number of NFT</td>
                                                <td className="py-2 px-4">{item.balance} NFT</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 px-4 font-semibold">Destination</td>
                                                <td className="py-2 px-4">Challenger</td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                            <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center rounded-md">Result (Success)</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="py-2 px-4 text-left whitespace-nowrap">Address</th>
                                            <th className="py-2 px-4 text-left">Percentage</th>
                                            <th className="py-2 px-4 text-left">Matic</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2 px-4 bg-gray-100">Mr. A</td>
                                            <td className="py-2 px-4">50%</td>
                                            <td className="py-2 px-4">5 Matic</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 bg-gray-100">Mr. B</td>
                                            <td className="py-2 px-4">50%</td>
                                            <td className="py-2 px-4">5 Matic</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 font-semibold bg-gray-100">Total</td>
                                            <td className="py-2 px-4">100%</td>
                                            <td className="py-2 px-4">10 Matic</td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="py-2 px-4 text-left whitespace-nowrap">Address</th>
                                            <th className="py-2 px-4 text-left">Percentage</th>
                                            <th className="py-2 px-4 text-left">TTJP</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2 px-4 bg-gray-100">Mr. A</td>
                                            <td className="py-2 px-4">50%</td>
                                            <td className="py-2 px-4">50 TTJP</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 bg-gray-100">Mr. B</td>
                                            <td className="py-2 px-4">50%</td>
                                            <td className="py-2 px-4">50 TTJP</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 font-semibold bg-gray-100">Total</td>
                                            <td className="py-2 px-4">100%</td>
                                            <td className="py-2 px-4">10 TTJP</td>
                                        </tr>
                                    </tbody>
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="py-2 px-4 text-left whitespace-nowrap" colSpan={3}>ERC-721</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="py-2 px-4 font-semibold bg-gray-100 whitespace-nowrap ">Contract Address</td>
                                            <td className="py-2 px-4" colSpan={2}>0x296F5c137b89407762E60</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 font-semibold bg-gray-100" rowSpan={2}>NFT1</td>
                                            <td className="py-2 px-4 font-semibold">Token ID</td>
                                            <td className="py-2 px-4">2</td>
                                        </tr>
                                        <tr className="bg-gray-100">
                                            <td className="py-2 px-4 font-semibold">Destination</td>
                                            <td className="py-2 px-4">Challenger</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 px-4 font-semibold bg-gray-100" rowSpan={3}>NFT2</td>
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
                </div>


            </div >
            {
                isOpen ?
                    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto overflow-x-hidden">
                        < div className="relative p-4 w-full max-w-md max-h-full" >
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button
                                    type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={hideModal}
                                >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-6 text-center">
                                    <svg className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{errorMessage}</h3>
                                    <button
                                        type="button"
                                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                        onClick={hideModal}
                                    >
                                        Yes, I&apos;m sure and re-check
                                    </button>

                                </div>
                            </div>
                        </div >
                    </div >
                    :
                    null
            }
        </div >
    );
};

export default SearchPage;
