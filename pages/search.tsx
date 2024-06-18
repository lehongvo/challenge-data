"use client";
import { useState, useCallback, useEffect } from 'react';
import QRCode from 'qrcode.react';
import Networks from '../utils/networks';
import { ethers } from 'ethers';
import ActAPC from '../utils/apiPrepare';
import numeral from 'numeral';
import ABI from '../utils/abiContract';
import dataExport from '../config';
import axios from 'axios';
import Languages from '../utils/language';

interface IGetListNftData {
    contractAddress: string;
    symbol: string;
    balance: number;
    listIndex: any[];
}

interface IGetStatusChallenger {
    message: string;
    status: Number
}

interface ReceiveData {
    percent: number;
    address: string;
}

interface IGetNftResult {
    contractAddress: string;
    symbol: string;
    nftId: number;
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
    totalPercent: Number,
    statusChallenger: IGetStatusChallenger,
    nftResult: IGetNftResult[]
}

interface TableData {
    contractAddress: string;
    sponsor: string;
    challenger: string;
    networkId: Number
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
            ],
            totalPercent: 100,
            statusChallenger: {
                message: "Predict results",
                status: 4
            },
            nftResult: [
                {
                    contractAddress: "0x296F5c137b89407762E602c82137196c603EF4",
                    symbol: "NFT EXSUP",
                    nftId: 1
                }
            ]
        }
    );
    const memoizedSetValue = useCallback((newValue: Challenger) => {
        setValue(newValue);
    }, []);
    const [selectedNetwork, setSelectedNetwork] = useState(DefaultNetwork);
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(DefaultError);
    const [isLoading, setIsLoading] = useState(false);
    const [isDetail, setIsDetail] = useState(false);

    const [contentData, setContentData] = useState(Languages.jp);

    const setIsDetailPcv = (addressContract: string, networkId: number) => {
        handleSearchDetail(addressContract, networkId);
        setIsDetail(!isDetail);
    };

    const setLangValue = (value: any) => {
        if (Number(value) == 1) {
            setContentData(Languages.jp);
        } else {
            setContentData(Languages.en);
        }
    }

    const setIsDetailNormal = () => {
        if (query.length > 0) {
            setIsDetail(!isDetail);
        }
        if (isDetail == true) {
            setIsDetail(!isDetail);
        }
    };

    function findNetworkByChainId(chainId: number) {
        return Networks.find(network => network.id === chainId);
    }

    const handleSearchDetail = async (addressContract: string, networkId: number) => {
        try {
            if (!ethers.utils.isAddress(addressContract)) {
                setIsOpen(true);
                setErrorMessage(contentData.INVALID_ETHEREUM_ADDRESS);
                return
            }

            let networkData = findNetworkByChainId(networkId)
            if (networkData) {
                const provider = new ethers.providers.JsonRpcProvider(networkData.RPC);

                const code = await provider.getCode(addressContract);
                if (code === "0x") {
                    setIsOpen(true);
                    setErrorMessage(contentData.WRONG_NETWORK);
                    return
                }

                setIsLoading(true)

                const [challengeStatus, objectData, listNftData, statusChallenger, etmNftData] = await Promise.all(
                    [
                        ActAPC.GetStatusChallenge(addressContract.toString(), provider),
                        ActAPC.PrepareApi(addressContract.toString(), Number(networkData.id)),
                        ActAPC.GetListNftData(addressContract.toString(), provider),
                        ActAPC.GetStatusChallenger(addressContract.toString(), provider),
                        ActAPC.EtmNftData(addressContract.toString(), provider)
                    ]
                )
                let historyTokenAndCoin = challengeStatus ?
                    await ActAPC.scanHistoryChallenge(
                        networkData.RPC,
                        addressContract.toString(),
                        getHash(objectData.data.daily_steps, objectData.data.giveup_hash)
                    ) :
                    await ActAPC.getHistoryTokenAndCoin(
                        networkData.historyBalanceChallengesContract,
                        networkData.RPC,
                        addressContract.toString()
                    );
                let arrayContainRewardVal = [];
                if ('coinBefore' in historyTokenAndCoin && 'coinAfter' in historyTokenAndCoin) {
                    if (Number(historyTokenAndCoin.coinAfter) + Number(historyTokenAndCoin.coinBefore!) > 0) {
                        arrayContainRewardVal.push(
                            {
                                "symbol": networkData.symbol,
                                "before": historyTokenAndCoin.coinBefore!,
                                "after": historyTokenAndCoin.coinAfter,
                            }
                        )
                    }

                    historyTokenAndCoin.listTokenAfter.forEach((item: any, i: number) => {
                        if (Number(item.value) + Number(historyTokenAndCoin.listTokenBefore[i].value) > 0) {
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
                if (addressContract.toString() == query) {
                    setIsOpen(true);
                    setErrorMessage(contentData.ALREADY_RESEARCH);
                    return
                }

                setQuery(addressContract.toString())
                setValue(
                    {
                        username: objectData.data.challenger.username,
                        address: objectData.data.challenger_wallet.address,
                        sponsorUsername: objectData.data.sponsor.username,
                        sponsorAddress: objectData.data.sponsor_wallet.address,
                        contractName: objectData.data.name,
                        challengeAddress: addressContract.toString(),
                        startTime: Number(objectData.data.date_start),
                        endTime: Number(objectData.data.date_end),
                        challengeDays: Number(objectData.data.execute_time),
                        minimumAchievementDays: Number(objectData.data.min_day_require),
                        dailySteps: objectData.data.daily_steps,
                        generateNft: objectData.data.generate_nft == 1 ? true : false,
                        giveUp: objectData.data.give_up == 1 ? true : false,
                        arrayContainReward: arrayContainRewardVal,
                        getListNftData: listNftData,
                        receiveSuccess: listDataSuccess,
                        receiveFail: listDataFailed,
                        totalPercent,
                        statusChallenger: statusChallenger,
                        nftResult: etmNftData
                    }
                );

                setIsLoading(false)
            } else {
                setIsOpen(true);
                setErrorMessage(contentData.NETWORK_NOT_FOUND);
                return
            }

        } catch (error) {
            console.log("error", error)
            setQuery("")
            setIsOpen(true);
            setErrorMessage((error as Error).message ? (error as Error).message : DefaultError);
            setIsLoading(false)
        };
    }

    const handleSearch = async (e: any) => {
        try {
            e.preventDefault();

            if (query.length <= 0) {
                setIsOpen(true);
                setErrorMessage(contentData.ENTER_ADDRESS);
                return
            }

            if (!ethers.utils.isAddress(query)) {
                setIsOpen(true);
                setErrorMessage(contentData.INVALID_ETHEREUM_ADDRESS);
                return
            }
            const networkData = Networks[selectedNetwork];
            const provider = new ethers.providers.JsonRpcProvider(networkData.RPC);


            const code = await provider.getCode(query);
            if (code === "0x") {
                setIsOpen(true);
                setErrorMessage(contentData.WRONG_NETWORK);
                return
            }

            setIsLoading(true)

            setIsDetailNormal()

            const [challengeStatus, objectData, listNftData, statusChallenger, etmNftData] = await Promise.all(
                [
                    ActAPC.GetStatusChallenge(query.toString(), provider),
                    ActAPC.PrepareApi(query.toString(), Number(networkData.id)),
                    ActAPC.GetListNftData(query.toString(), provider),
                    ActAPC.GetStatusChallenger(query.toString(), provider),
                    ActAPC.EtmNftData(query.toString(), provider)
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
                if (Number(historyTokenAndCoin.coinAfter) + Number(historyTokenAndCoin.coinBefore!) > 0) {
                    arrayContainRewardVal.push(
                        {
                            "symbol": networkData.symbol,
                            "before": historyTokenAndCoin.coinBefore!,
                            "after": historyTokenAndCoin.coinAfter,
                        }
                    )
                }

                historyTokenAndCoin.listTokenAfter.forEach((item: any, i: number) => {
                    if (Number(item.value) + Number(historyTokenAndCoin.listTokenBefore[i].value) > 0) {
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
                    receiveSuccess: listDataSuccess,
                    receiveFail: listDataFailed,
                    totalPercent,
                    statusChallenger: statusChallenger,
                    nftResult: etmNftData
                }
            );

            setIsLoading(false)
        } catch (error) {
            setQuery("")
            setIsOpen(true);
            setErrorMessage(contentData.ERROR_NOT_FOUND);
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

    const [data, setData] = useState<TableData[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoadingData(true);
                const response = await axios.get(`${dataExport.MAIN_API}/${dataExport.GET_ALL_CHALLENGE}`);
                let dataResult: TableData[] = [];
                response.data.data.results.forEach((item: any, index: number) => {
                    dataResult.push({
                        contractAddress: item.address,
                        sponsor: item.sponsor_wallet.address,
                        challenger: item.challenger_wallet.address,
                        networkId: item.network_id
                    });
                });
                setData(dataResult);
            } catch (error) {
                setData([]);
                setIsLoadingData(false);
                console.error('Error fetching data:', error);
            }
        };
        fetchData()
    }, []);

    const itemsPerPage = 10;

    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-start  ">
            {
                isLoading && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-full px-6 py-4 flex items-center space-x-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-4 border-blue-500 border-t-transparent"></div>
                        <p className="text-gray-700 font-semibold">{contentData.LOADING}...</p>
                    </div>
                </div>
            }

            {
                !isLoadingData && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-full px-6 py-4 flex items-center space-x-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-4 border-blue-500 border-t-transparent"></div>
                        <p className="text-gray-700 font-semibold">{contentData.LOADING}...</p>
                    </div>
                </div>
            }

            <div className="w-full flex-col mx-auto p-">
                <header className="flex w-4/5 my-5 overflow-x-auto justify-between items-center rounded-lg mx-auto">
                    <div className="w-full">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder={contentData.PLACEHOLDER}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="h-14  text-lg   bg-white shadow-md flex-grow p-1 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 sm:min-w-[300px]"
                            />
                            <button
                                type="submit"
                                onClick={handleSearch}
                                className="ml-[0.2%] text-lg h-14 w-40 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 sm:px-4 sm:py-2 flex items-center justify-center"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 10-14 0 7 7 0 0014 0z"
                                    />
                                </svg>
                                {contentData.SEARCH}
                            </button>

                            <select
                                className="ml-2 h-14 text-lg px-2 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-700 sm:px-4 sm:py-2"
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
                                onClick={setIsDetailNormal}
                                className="h-14 text-lg ml-[0.2%] w-40 px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 sm:px-4 sm:py-2 flex items-center justify-center"
                            >
                                {contentData.DASHBOARD}
                            </button>
                            <select
                                className="ml-1 h-14 text-lg px-2 py-1 bg-gray-600 text-white rounded-md hover:bg-orange-700"
                                onChange={(e) =>
                                    setLangValue(Number(e.target.value))
                                }
                            >
                                <option key={1} value={1}>JP 🇯🇵</option>
                                <option key={2} value={2}>EN 🇺🇸</option>
                            </select>
                        </div>
                    </div>
                </header>
                {
                    isDetail ?
                        <>
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
                                            <th className="py-2 px-4 border-r border-gray-300">{contentData.ROLE}</th>
                                            <th className="py-2 px-4 border-r border-gray-300">{contentData.NAME}</th>
                                            <th className="py-2 px-4 border-r border-gray-300">{contentData.ADDRESS}</th>
                                            <th className="py-2 px-4">{contentData.QR_CODE}</th>
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
                                    <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center rounded-md">{contentData.CHALLENGE_INFORMATION}</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <tbody>
                                                <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">{contentData.NETWORK}</td><td className="py-2 px-4">{Networks[selectedNetwork].name}</td></tr>
                                                <tr><td className="py-2 px-4 font-semibold">{contentData.CONTRACT_ADDRESS}</td><td className="py-2 px-4 truncate">{value.challengeAddress}</td></tr>
                                                <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">{contentData.SPONSOR}</td><td className="py-2 px-4 truncate">{value.sponsorAddress}</td></tr>
                                                <tr><td className="py-2 px-4 font-semibold">{contentData.CHALLENGER}</td><td className="py-2 px-4 truncate">{value.address}</td></tr>
                                                <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">{contentData.STATUS}</td><td className="py-2 px-4">{checkTime(value.startTime, value.endTime) ? contentData.NOT_FINISH : (value.startTime > Math.ceil(new Date().getTime() / 1000) ? contentData.NOT_STARTED : contentData.FINISHED)}</td></tr>
                                                <tr><td className="py-2 px-4 font-semibold">{contentData.CHALLENGE_START}</td><td className="py-2 px-4">{formatTimestamp(value.startTime)}</td></tr>
                                                <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">{contentData.CHALLENGE_END}</td><td className="py-2 px-4">{formatTimestamp(value.endTime)}</td></tr>
                                                <tr><td className="py-2 px-4 font-semibold">{contentData.CHALLENGE_DAYS}</td><td className="py-2 px-4">{value.challengeDays.toString()} {contentData.DAYS}</td></tr>
                                                <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">{contentData.MINIMUM_ACHIEVEMENT_DAYS}</td><td className="py-2 px-4">{value.minimumAchievementDays.toString()} {contentData.DAYS}</td></tr>
                                                <tr><td className="py-2 px-4 font-semibold">{contentData.ACHIEVEMENT_RATIO}</td><td className="py-2 px-4">{getRatioProcessing(value.dailySteps)}%</td></tr>
                                                <tr className="bg-gray-100"><td className="py-2 px-4 font-semibold">{contentData.GIVE_UP}</td><td className="py-2 px-4">{value.giveUp ? contentData.YES : contentData.NO} (1)</td></tr>
                                                <tr><td className="py-2 px-4 font-semibold">{contentData.NFT}</td><td className="py-2 px-4">{value.generateNft ? contentData.YES : contentData.NO}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-lg shadow-md md:w-1/2">
                                    <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center rounded-md">{contentData.STEP_DATA}</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-gray-200">
                                                    <th className="py-2 px-4 text-center">{contentData.DATE}</th>
                                                    <th className="py-2 px-4 text-center">{contentData.STEPS}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    value.dailySteps.map((item: any, index: number) => (
                                                        <tr key={index}><td className="py-2 px-4 text-center">{formatTimestamp(item.timestamp)}</td><td className="py-2 px-4 text-center">{numeral(item.step).format('0,0')} {contentData.STEPS.toLowerCase()}</td></tr>
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
                                        <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center rounded-md">{contentData.DEPOSIT_COIN_ERC20}</h2>
                                        <table className="w-full">
                                            {value.arrayContainReward.map((item: any, index: number) => (
                                                <>
                                                    <thead>
                                                        <tr className="bg-gray-200">
                                                            <th className="py-2 px-4 text-left" colSpan={Number("2")}>{item.symbol}</th>
                                                            <th className="py-2 px-4 text-left" colSpan={Number("2")}>{contentData.AMOUNT}</th>
                                                        </tr>
                                                    </thead >
                                                    <tbody>
                                                        <tr><td className="py-2 px-4 font-semibold bg-gray-100">{contentData.INITIAL}</td><td className="py-2 px-4">{item.before} {item.symbol}</td></tr>
                                                        <tr><td className="py-2 px-4 font-semibold bg-gray-100">{contentData.ADDITIONAL}</td><td className="py-2 px-4">{item.after} {item.symbol}</td></tr>
                                                        <tr><td className="py-2 px-4 font-semibold bg-gray-100">{contentData.TOTAL}</td><td className="py-2 px-4">{item.after + item.before} {item.symbol}</td></tr>
                                                    </tbody>
                                                </>
                                            ))}
                                        </table>
                                    </div>

                                    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                                        <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center rounded-md">{contentData.DIVIDEND_SUCCESS}</h2>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="bg-gray-200">
                                                        <th className="py-2 px-4 text-left">{contentData.ADDRESS}</th>
                                                        <th className="py-2 px-4 text-left">{contentData.PERCENTAGE}</th>
                                                        <th className="py-2 px-4 text-left">{contentData.SYMBOL}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {value.arrayContainReward.map((item: any, index: number) => (
                                                        <>
                                                            {value.receiveSuccess.map((item1: any, index1: number) => (
                                                                <tr key={index1}>
                                                                    <td className="py-2 px-4 bg-gray-100 whitespace-nowrap">{item1.address}</td>
                                                                    <td className="py-2 px-4">{item1.percent}%</td>
                                                                    <td className="py-2 px-4">{Math.round(((item.after + item.before) * item1.percent / 100) * 1000000000000) / 1000000000000} {item.symbol}</td>
                                                                </tr>
                                                            ))}
                                                            <tr>
                                                                <td className="py-2 px-4 font-semibold bg-gray-100">{contentData.TOTAL}</td>
                                                                <td className="py-2 px-4">{(+value.totalPercent / 2).toString()}%</td>
                                                                <td className="py-2 px-4">{item.after + item.before} {item.symbol}</td>
                                                            </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center rounded-md">{contentData.DIVIDEND_FAILURE}</h2>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="bg-gray-200">
                                                        <th className="py-2 px-4 text-left">{contentData.ADDRESS}</th>
                                                        <th className="py-2 px-4 text-left">{contentData.PERCENTAGE}</th>
                                                        <th className="py-2 px-4 text-left">{contentData.SYMBOL}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {value.arrayContainReward.map((item: any, index: number) => (
                                                        <>
                                                            {value.receiveFail.map((item1: any, index: number) => (
                                                                <tr key={index}>
                                                                    <td className="py-2 px-4 bg-gray-100 whitespace-nowrap">{item1.address}</td>
                                                                    <td className="py-2 px-4">{item1.percent}%</td>
                                                                    <td className="py-2 px-4">{Math.round(((item.after + item.before) * item1.percent / 100) * 1000000000000) / 1000000000000} {item.symbol}</td>
                                                                </tr>
                                                            ))}
                                                            <tr>
                                                                <td className="py-2 px-4 font-semibold bg-gray-100">{contentData.TOTAL}</td>
                                                                <td className="py-2 px-4">{(+value.totalPercent / 2).toString()}%</td>
                                                                <td className="py-2 px-4">{item.after + item.before} {item.symbol}</td>
                                                            </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 md:pl-2">
                                    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                                        <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center rounded-md">{contentData.DEPOSIT_NFT}</h2>
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
                                                            <td className="py-2 px-4 font-semibold bg-gray-100">{contentData.COLLECTION}</td>
                                                            <td className="py-2 px-4 whitespace-nowrap" colSpan={2}>{item.contractAddress}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-2 px-4 font-semibold bg-gray-100" rowSpan={3}>{item.symbol}</td>
                                                            <td className="py-2 px-4 font-semibold">{contentData.TOKEN_ID}</td>
                                                            <td className="py-2 px-4">{item.listIndex.length > 0 ? item.listIndex : contentData.NONE}</td>
                                                        </tr>
                                                        <tr className="bg-gray-100">
                                                            <td className="py-2 px-4 font-semibold">{contentData.NUMBER_OF_NFT}</td>
                                                            <td className="py-2 px-4">{item.balance}NFT</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-2 px-4 font-semibold">{contentData.DESTINATION}</td>
                                                            <td className="py-2 px-4">{contentData.CHALLENGER}</td>
                                                        </tr>
                                                    </tbody>
                                                ))}
                                            </table>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                                        <h2 className="text-xl font-bold mb-4 bg-blue-500 text-white p-2 text-center rounded-md">Result({value.statusChallenger.message})</h2>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="bg-gray-200">
                                                        <th className="py-2 px-4 text-left">{contentData.ADDRESS}</th>
                                                        <th className="py-2 px-4 text-left">{contentData.PERCENTAGE}</th>
                                                        <th className="py-2 px-4 text-left">{contentData.STEP_DATA}</th>
                                                    </tr>
                                                </thead>

                                                {value.statusChallenger.status == 3 || value.statusChallenger.status == 2 ?
                                                    <tbody>
                                                        {value.arrayContainReward.map((item: any, index: number) => (
                                                            <>
                                                                {value.receiveFail.map((item1: any, index: number) => (
                                                                    <tr key={index}>
                                                                        <td className="py-2 px-4 bg-gray-100 whitespace-nowrap">{item1.address}</td>
                                                                        <td className="py-2 px-4">{item1.percent}%</td>
                                                                        <td className="py-2 px-4">{Math.round(((item.after + item.before) * item1.percent / 100) * 1000000000000) / 1000000000000} {item.symbol}</td>
                                                                    </tr>
                                                                ))}
                                                                <tr>
                                                                    <td className="py-2 px-4 font-semibold bg-gray-100">{contentData.TOTAL}</td>
                                                                    <td className="py-2 px-4">{(+value.totalPercent / 2).toString()}%</td>
                                                                    <td className="py-2 px-4">{item.after + item.before} {item.symbol}</td>
                                                                </tr>
                                                            </>
                                                        ))}
                                                    </tbody>
                                                    :
                                                    <tbody>
                                                        {value.arrayContainReward.map((item: any, index: number) => (
                                                            <>
                                                                {value.receiveSuccess.map((item1: any, index1: number) => (
                                                                    <tr key={index1}>
                                                                        <td className="py-2 px-4 bg-gray-100 whitespace-nowrap">{item1.address}</td>
                                                                        <td className="py-2 px-4">{item1.percent}%</td>
                                                                        <td className="py-2 px-4">{Math.round(((item.after + item.before) * item1.percent / 100) * 1000000000000) / 1000000000000} {item.symbol}</td>
                                                                    </tr>
                                                                ))}
                                                                <tr>
                                                                    <td className="py-2 px-4 font-semibold bg-gray-100">{contentData.TOTAL}</td>
                                                                    <td className="py-2 px-4">{(+value.totalPercent / 2).toString()}%</td>
                                                                    <td className="py-2 px-4">{item.after + item.before} {item.symbol}</td>
                                                                </tr>
                                                            </>
                                                        ))}
                                                    </tbody>
                                                }



                                                {value.nftResult
                                                    .filter((item: any) => value.statusChallenger.status !== 3 && value.statusChallenger.status !== 2)
                                                    .map((item: any, index: number) => (
                                                        <>
                                                            <thead>
                                                                <tr className="bg-gray-200">
                                                                    <th className="py-2 px-4 text-left whitespace-nowrap" colSpan={3}>ERC-721</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody key={index}>
                                                                <tr>
                                                                    <td className="py-2 px-4 font-semibold bg-gray-100 whitespace-nowrap">{contentData.CONTRACT_ADDRESS}</td>
                                                                    <td className="py-2 px-4" colSpan={2}>{item.contractAddress}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="py-2 px-4 font-semibold bg-gray-100" rowSpan={2}>{item.symbol}</td>
                                                                    <td className="py-2 px-4 font-semibold">{contentData.TOKEN_ID}</td>
                                                                    <td className="py-2 px-4">{item.nftId}</td>
                                                                </tr>
                                                                <tr className="bg-gray-100">
                                                                    <td className="py-2 px-4 font-semibold">{contentData.DESTINATION}</td>
                                                                    <td className="py-2 px-4">{contentData.CHALLENGER}</td>
                                                                </tr>
                                                            </tbody>
                                                        </>
                                                    ))}

                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </> :
                        <>
                            <div className="overflow-x-auto m-10">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th scope="col" className="px-8 py-4 text-center text-xl font-bold font-medium uppercase tracking-wider">
                                                {contentData.CONTRACT_ADDRESS}
                                            </th>
                                            <th scope="col" className="px-8 py-4 text-center text-xl font-bold uppercase tracking-wider">
                                                {contentData.SPONSOR}
                                            </th>
                                            <th scope="col" className="px-8 py-4 text-center text-xl font-bold uppercase tracking-wider">
                                                {contentData.CHALLENGER}
                                            </th>
                                            <th scope="col" className="px-8 py-4 text-center text-xl font-bold uppercase tracking-wider">
                                                {contentData.DETAIL}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {currentData.map((row, index) => (
                                            <tr key={index} className="odd:bg-gray-100 even:bg-gray-200">
                                                <td className="px-8 py-6 whitespace-nowrap">{row.contractAddress}</td>
                                                <td className="px-8 py-6 whitespace-nowrap">{row.sponsor}</td>
                                                <td className="px-8 py-6 whitespace-nowrap">{row.challenger}</td>
                                                <td className="px-8 py-6 whitespace-nowrap">
                                                    <button
                                                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => setIsDetailPcv(row.contractAddress, Number(row.networkId))}
                                                        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                    >
                                                        {contentData.DETAIL}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-center mb-4">
                                <button
                                    className="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded"
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 0}
                                >
                                    {contentData.PREVIOUS}
                                </button>
                                <span className="px-4 py-2">
                                    {contentData.PAGE} {currentPage + 1} {contentData.OF} {totalPages}
                                </span>
                                <button
                                    className="px-4 py-2 mx-1 bg-gray-200 hover:bg-gray-300 rounded"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages - 1}
                                >
                                    {contentData.NEXT}
                                </button>
                            </div>
                        </>
                }
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
                                    <span className="sr-only">{contentData.CLOSE_MODAL}</span>
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
                                        {contentData.CONFIRM_ERROR}
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
