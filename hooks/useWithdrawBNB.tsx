import { useCallback, useEffect, useState } from 'react';
import { useSendTransaction, useFeeData } from 'wagmi';
import { ethers, parseUnits } from 'ethers';

const contractABI = require('../abi/ahp.json');
const CONTRACT_ADDRESS = '0x9273f6bA407126ec93b59ec9126D8df40a4B8F11';

export function useWithdrawBNB(address:any, amount:any, petID:any, enabled:any) {
  const { sendTransaction, data, isLoading, isSuccess, error } = useSendTransaction();
  const { data: feeData}:any = useFeeData();

  const withdrawB = useCallback(() => {
    if (!enabled || !address || address === 'null' || !amount || parseFloat(amount) === 0) {
      console.error("Invalid input or not enabled.");
      return;
    }
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      console.error("Invalid amount.");
      return;
    }
    const weiAmount = parseUnits(numericAmount.toString(), 'ether');
    const iface = new ethers.Interface(contractABI);
    const encodedData:any = iface.encodeFunctionData('withdrawBNB', [weiAmount, petID || 0]);

    sendTransaction({
      to: CONTRACT_ADDRESS,
      data: encodedData,
      gasPrice: feeData?.gasPrice
    });
  }, [amount, address, petID, enabled, sendTransaction, feeData]);
  
  useEffect(() => {
    if (enabled) {
      console.log("Hook is enabled and ready to send transactions.");
    }
  }, [enabled]);

  return {
    withdrawB,
    dataB: data,
    isLoadingB: isLoading,
    isSuccessB: isSuccess,
    errorB: error
  };
}
