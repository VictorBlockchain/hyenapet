import { useSendTransaction, useFeeData } from 'wagmi';
import { useCallback, useEffect } from 'react';
import { ethers } from 'ethers'; // Proper import of ethers utilities
import contractABI from '../abi/ahp.json';  // Make sure this path is correct
const CONTRACT_ADDRESS = '0x9273f6bA407126ec93b59ec9126D8df40a4B8F11';

export function useLockBNB(address:any, petID:any, timestamp:any, enabled:any) {
    useEffect(() => {
        if (!enabled) return;
    }, [enabled]);

    const iface = new ethers.Interface(contractABI);
    let encodedData:any = iface.encodeFunctionData('lockBNB', [petID || 0, timestamp || 0]);
    const { sendTransaction, data: dataLB, isLoading: isLoadingLB, isSuccess: isSuccessLB, error: errorLB } = useSendTransaction();
    const { data: feeData, isError: feeError, isLoading: feeLoading }:any = useFeeData();

    const lockB = useCallback(() => {
        if (feeData) {
            sendTransaction({
                to: CONTRACT_ADDRESS,
                data: encodedData,
                gasPrice: feeData.gasPrice
            });
        }
    }, [feeData, sendTransaction, encodedData]);

    return {
        lockB,
        dataLB,
        isLoadingLB,
        isSuccessLB,
        errorLB,
        feeError,
        feeLoading
    };
}
