import axios from "axios";
import dataExport from "../config";
import ABI from "./abiContract";
import { ethers } from "ethers";
import _ from 'lodash';
import { AnyNaptrRecord } from "dns";

interface TokenInfo {
    name: string;
    value: number;
}

interface HistoryData {
    coinBefore: number;
    coinAfter: number;
    listTokenBefore: TokenInfo[];
    listTokenAfter: TokenInfo[];
    contractAddressNFT: string;
    tokenIdNFT: number;
    isFinished: boolean;
}

interface ErrorResponse {
    error: string;
    message: string;
    code: string;
}

const isMappable = (array: any) => {
    if (Array.isArray(array)) return array.length > 0;
    return false;
}

const getHistoryTokenAndCoin = async (
    historyBalanceChallengesContract: string,
    network: string,
    challengeContractAddress: string
): Promise<HistoryData | ErrorResponse> => {
    const provider = new ethers.providers.JsonRpcProvider(network);
    const balanceChallengeHistory = new ethers.Contract(
        historyBalanceChallengesContract,
        ABI.abiBalanceHistory,
        provider
    );
    const [historyBalance, getNFTValue] = await Promise.all([
        balanceChallengeHistory.getHistoryTokenAndCoinSendToContract(challengeContractAddress),
        balanceChallengeHistory.challengesInfo2(challengeContractAddress),
    ]);

    let listBalance = historyBalance.slice(0, historyBalance.length - 1)
    const listTokenName = _.flatten(historyBalance.slice(-1))

    listBalance = listBalance.map((balance: any) => {
        if (isMappable(balance)) {
            balance = balance.map((price: any) => Number(price.toString()));
        } else {
            balance = Number(balance.toString());
        }
        return balance;
    });
    const listTokenInfo = listBalance.slice(-2);
    const [listTokenBefore, listTokenAfter] = await Promise.all([
        Promise.all(
            listTokenName.map(async (name: any, i: any) => {
                let value;
                if (name === 'USDT') {
                    value = listTokenInfo[0][i] !== 0 ? (listTokenInfo[0][i] / Math.pow(10, 6)).toFixed(10) : listTokenInfo[0][i];
                    value = parseFloat(value);
                } else {
                    value = parseFloat(listTokenInfo[0][i] !== 0 ? (listTokenInfo[0][i] / Math.pow(10, 18)).toFixed(10) : listTokenInfo[0][i]);
                }
                return { name, value };
            })
        ),
        Promise.all(
            listTokenName.map(async (name: any, i: any) => {
                let value;
                if (name === 'USDT') {
                    value = listTokenInfo[1][i] !== 0 ? (listTokenInfo[1][i] / Math.pow(10, 6)).toFixed(10) : listTokenInfo[1][i];
                    value = parseFloat(value);
                } else {
                    value = parseFloat(listTokenInfo[1][i] !== 0 ? (listTokenInfo[1][i] / Math.pow(10, 18)).toFixed(10) : listTokenInfo[1][i]);
                }
                return { name, value };
            })
        ),
    ]);
    const tokenId = Number(getNFTValue[2]);
    const data: HistoryData = {
        coinBefore: parseFloat(listBalance[0] !== 0 ? listBalance[0] / Math.pow(10, 18) : listBalance[0]),
        coinAfter: parseFloat(listBalance[1] !== 0 ? listBalance[1] / Math.pow(10, 18) : listBalance[1]),
        listTokenBefore,
        listTokenAfter,
        contractAddressNFT: getNFTValue[4],
        tokenIdNFT: tokenId,
        isFinished: false,
    };

    return data
};

interface HistoryBalance {
    coinBalanceBefor: number;
    coinBalanceAfter: number;
    tokenBalanceBefor: number[];
    tokenBalanceAfter: number[];
    listTokenSymbol: string[];
}

interface NFTData {
    contract: string;
    id: string;
}

interface TokenData {
    symbol: string;
    value: number;
}

interface DataRes {
    coinBefore: number;
    coinAfter: number;
    listTokenBefore: { name: string; value: number }[];
    listTokenAfter: { name: string; value: number }[];
    contractAddressNFT: string;
    tokenIdNFT: string;
    isFinished: boolean;
}

const genesisContract: string = '0x0000000000000000000000000000000000001010';

const scanHistoryChallenge = async (
    network: string,
    challengeContractAddress: string,
    transactionHashFinish: string
): Promise<DataRes | { error: string; message: string }> => {
    console.log("---------02")
    const provider = new ethers.providers.JsonRpcProvider(network);
    const challengeContract = new ethers.Contract(
        challengeContractAddress,
        ABI.challengeABI,
        provider
    );

    const [isCoinChallenges, valueSend, createByToken, isFinished, erc721Address] = await Promise.all([
        challengeContract.allowGiveUp(1),
        challengeContract.totalReward(),
        challengeContract.createByToken(),
        challengeContract.isFinished(),
        challengeContract.erc721Address(0)
    ]);

    const erc721Contract = new ethers.Contract(
        erc721Address,
        ABI.exerciseSupplementNFTABI,
        provider
    );

    let listSpecialNftAddress: string[] = (await erc721Contract.getSpecialNftAddress()).map((address: string) => address.toUpperCase());
    listSpecialNftAddress.push(erc721Address.toUpperCase());

    let totalReward: ethers.BigNumber = valueSend;

    let historyBalance: HistoryBalance = {
        coinBalanceBefor: 0,
        coinBalanceAfter: 0,
        tokenBalanceBefor: [],
        tokenBalanceAfter: [],
        listTokenSymbol: [],
    };

    if (isCoinChallenges) {
        totalReward = ethers.utils.parseEther(totalReward.toString());
    } else {
        const token = new ethers.Contract(
            createByToken,
            ABI.tokenERC20ABI,
            provider
        );
        const [symbol, decimal] = await Promise.all([
            token.symbol(),
            token.decimals()
        ]);
        totalReward = totalReward.div(ethers.BigNumber.from(10).pow(decimal));
        historyBalance.listTokenSymbol.push(symbol);
    }

    const allContractERC20: string[] = await challengeContract.allContractERC20();
    for (let index = 0; index < allContractERC20.length; index++) {
        historyBalance.tokenBalanceBefor.push(0);
        historyBalance.tokenBalanceAfter.push(0);
        const token = new ethers.Contract(
            allContractERC20[index],
            ABI.tokenERC20ABI,
            provider
        );
        const symbol: string = await token.symbol();
        if (!historyBalance.listTokenSymbol.includes(symbol)) {
            historyBalance.listTokenSymbol.push(symbol);
        }
    }

    if (isCoinChallenges) {
        historyBalance.coinBalanceBefor = parseFloat(ethers.utils.formatEther(totalReward));
        historyBalance.tokenBalanceBefor[0] = 0;
    } else {
        historyBalance.coinBalanceBefor = 0;
        historyBalance.tokenBalanceBefor[0] = parseFloat(totalReward.toString());
        historyBalance.tokenBalanceAfter[0] = 0;
    }

    const receipt = await provider.getTransactionReceipt(transactionHashFinish);

    let result: TokenData[] = [];
    let nftdata: NFTData = {
        contract: "0x0000000000000000000000000000000000000000",
        id: "0"
    };
    let totalAmountCoin: number = 0;

    for (const log of receipt.logs) {
        if (log.topics.length === 3 && log.topics[2] !== '0x0000000000000000000000000000000000000000000000000000000000000000' && log.address.toUpperCase() !== challengeContractAddress.toUpperCase()) {
            const token = new ethers.Contract(
                log.address,
                ABI.tokenERC20ABI,
                provider
            );
            const [symbol, decimal] = await Promise.all([
                token.symbol(),
                token.decimals()
            ]);
            const hexString = log.topics[1];
            const cleanHexString = hexString.slice(2);
            const cleanedAddress = cleanHexString.slice(-40);
            const address = ethers.utils.getAddress('0x' + cleanedAddress);
            if (address.toUpperCase() === challengeContractAddress.toUpperCase()) {
                const value = parseFloat(ethers.utils.formatUnits(log.data, decimal));
                let existingIndex = result.findIndex(obj => obj.symbol === symbol);
                if (existingIndex >= 0) {
                    result[existingIndex].value = parseFloat((result[existingIndex].value + value).toFixed(10));
                } else {
                    const data: TokenData = {
                        symbol: symbol,
                        value: value
                    };
                    result.push(data);
                }
            }
        }
        if (
            log.topics.length === 4 &&
            log.topics[1] === '0x0000000000000000000000000000000000000000000000000000000000000000' &&
            listSpecialNftAddress.includes(log.address.toUpperCase())
        ) {
            nftdata.contract = log.address;
            nftdata.id = ethers.BigNumber.from(log.topics[3]).toString();
        }
        if (
            log.topics.length === 4 &&
            log.topics[0] === '0xe6497e3ee548a3372136af2fcb0696db31fc6cf20260707645068bd3fe97f3c4'
        ) {
            const contract = new ethers.Contract(genesisContract, ABI.abiScanData);
            const decodedData = contract.interface.decodeEventLog("LogTransfer", log.data);
            totalAmountCoin += parseFloat(ethers.utils.formatEther(decodedData[0]));
        }
    }

    historyBalance.tokenBalanceAfter.forEach((_, i) => {
        result.forEach((res) => {
            if (historyBalance.listTokenSymbol[i].toUpperCase() === res.symbol.toUpperCase()) {
                if (i === 0 && res.value >= historyBalance.tokenBalanceAfter[i] && res.value !== 0) {
                    historyBalance.tokenBalanceAfter[i] = res.value - historyBalance.tokenBalanceAfter[i] - historyBalance.tokenBalanceBefor[i];
                } else {
                    historyBalance.tokenBalanceAfter[i] += res.value;
                }
            }
        });
    });

    const dataRes: DataRes = {
        coinBefore: historyBalance.coinBalanceBefor,
        coinAfter: historyBalance.coinBalanceAfter,
        listTokenBefore: [],
        listTokenAfter: [],
        contractAddressNFT: nftdata.contract,
        tokenIdNFT: nftdata.id,
        isFinished: isFinished
    };

    for (let index = 0; index < historyBalance.tokenBalanceBefor.length; index++) {
        const data = {
            name: historyBalance.listTokenSymbol[index],
            value: historyBalance.tokenBalanceBefor[index]
        };
        dataRes.listTokenBefore.push(data);
        const dataAfter = {
            name: historyBalance.listTokenSymbol[index],
            value: historyBalance.tokenBalanceAfter[index]
        };
        dataRes.listTokenAfter.push(dataAfter);
    }

    if (totalAmountCoin > dataRes.coinBefore) {
        dataRes.coinAfter = totalAmountCoin - dataRes.coinBefore;
    }

    return dataRes;
};


const PrepareApi = async (address: string, idNetwork: number) => {
    try {
        const mainApi = dataExport.MAIN_API;
        const featureApi = dataExport.FEATURED_API;

        const apiUrl = `${mainApi}/${featureApi}/?address=${address}&network_id=${idNetwork}`;
        console.log("apiUrl", apiUrl)
        const response = await axios.get(apiUrl);

        return {
            status: true,
            data: response.data.data ? response.data.data[0] : null,
            message: response.data.message
        };
    } catch (error: any) {
        let errorMessage = "Something went wrong";

        if (error.response) {
            errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
            errorMessage = "No response received from the API";
        } else {
            errorMessage = error.message;
        }

        return {
            status: false,
            data: null,
            message: errorMessage
        };
    }
};

const GetStatusChallenge = async (challengeContractAddress: string, provider: any) => {
    try {
        const challengeContract = new ethers.Contract(
            challengeContractAddress,
            ABI.challengeABI,
            provider
        );
        const isFinished = await challengeContract.isFinished();
        return isFinished;
    } catch (error) {
        console.log(error);
        let errorMessage = "Something went wrong";
    }
}

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

const GetListNftData = async (challengeContractAddress: string, provider: any): Promise<IGetListNftData[]> => {
    try {
        const challengeContract = new ethers.Contract(
            challengeContractAddress,
            ABI.challengeABI,
            provider
        );

        const nftAddress = await challengeContract.erc721Address(0);

        const nftContract = new ethers.Contract(
            nftAddress,
            ABI.exerciseSupplementNFTAddressABI,
            provider
        );

        const nftListAddress = await nftContract.getNftListAddress();
        let nftData: IGetListNftData[] = [];

        const promises = nftListAddress.map(async (item: any, index: number) => {
            const nft = new ethers.Contract(
                item,
                ABI.exerciseSupplementNFTABI,
                provider
            );

            const [symbol, balance, nextTokenIdToMint] = await Promise.all([
                nft.symbol(),
                nft.balanceOf(challengeContractAddress),
                nft.nextTokenIdToMint()
            ]);

            let listIndex: number[] = [];

            if (balance != 0) {
                for (let i = 0; i < nextTokenIdToMint; i++) {
                    try {
                        const owner = await nft.ownerOf(i);
                        if ((owner.toString()).toUpperCase() === (challengeContractAddress.toString()).toUpperCase()) {
                            listIndex.push(i);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }

            nftData.push({
                contractAddress: item.toString(),
                symbol: symbol.toString(),
                balance: Number(balance),
                listIndex
            });
        });

        await Promise.all(promises);

        console.log("nftData", nftData);

        return nftData;
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
    }
}

const GetStatusChallenger = async (challengeContractAddress: string, provider: any): Promise<IGetStatusChallenger> => {
    try {
        const challengeContract = new ethers.Contract(
            challengeContractAddress,
            ABI.challengeABI,
            provider
        );
        const [endTime, isFinished, isSuccess] = await Promise.all([
            challengeContract.endTime(),
            challengeContract.isFinished(),
            challengeContract.isSuccess()  
        ])
        if(isSuccess && isFinished) {
            return {
                message: "Successful",
                status: 1
            }
        }

        if(!isSuccess && isFinished) {
            return {
                message: "Failed",
                status: 2
            }
        }

        if(endTime < Date.now() / 1000 ) {
            return {
                message: "Expire but not send yet",
                status: 3
            }
        }

        return {
            message: "Predict results",
            status: 4
        }
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
    }
}

export default {
    PrepareApi,
    getHistoryTokenAndCoin,
    scanHistoryChallenge,
    GetStatusChallenge,
    GetListNftData,
    GetStatusChallenger
};
