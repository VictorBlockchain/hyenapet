import { useContractRead } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

// Define the ABI and contract address
const contractABI = require('../abi/ahp.json');
const CONTRACT_ADDRESS = '0x9273f6bA407126ec93b59ec9126D8df40a4B8F11';

export function useGetWalletLock(petId: any, enabled:any) {

  useEffect(() => {
    if (!enabled) return;
  }, [enabled]);
  
  if(!petId || petId=='null' || petId==null){
      petId= 0
  }
  
    
  const { data: walletLocked, isLoading: isLoadingWL, error: errorWL } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'walletLocked',
    args: [petId]

  });

  const { data: walletUnlockDate, isLoading: isLoadingWUL, error: errorWUL } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'walletUnlockDate',
    args: [petId]
  
  });
  
  const isLoading = isLoadingWL || isLoadingWUL;
  const errors = [errorWL, errorWUL].filter(Boolean);
  
  let unlockdate:any = walletUnlockDate
  if(unlockdate>0){
    unlockdate = unlockdate.toString()
  }else{
    unlockdate = 0
  }
  const wallet:any = {
    walletLocked: walletLocked,
    walletUnlockDate: unlockdate,
  };
  
  return {
    walletLock: wallet,
    errorW: errors,
    loadingW: isLoading
  };
}
