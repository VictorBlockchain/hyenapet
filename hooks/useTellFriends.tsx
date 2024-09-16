import { useSendTransaction, useFeeData } from 'wagmi';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // Proper import of ethers utilities
import contractABI from '../abi/ahp.json';  // Make sure this path is correct
const CONTRACT_ADDRESS = '0x9273f6bA407126ec93b59ec9126D8df40a4B8F11';

export function useTellFriends(address:any, friends:any, enabled:any) {

    useEffect(() => {
        if (!enabled) return;
    }, [enabled]);

    const iface = new ethers.Interface(contractABI);
    let encodedData:any
    if(friends=="" || !friends || friends == null){
    friends = [];
    }
    
    
    encodedData = iface.encodeFunctionData('tellFriends', [friends]);
    const { sendTransaction, data, isLoading, isSuccess, error } = useSendTransaction();
    const { data: feeData, isError: feeError, isLoading: feeLoading }:any = useFeeData();
    
    const tell = () => {
        sendTransaction({
            to: CONTRACT_ADDRESS,
            data: encodedData,
            gasPrice: feeData.gasPrice
        });
    };
    
    return {
        tell,
        data,
        isLoading,
        isSuccess,
        error
    };

}
