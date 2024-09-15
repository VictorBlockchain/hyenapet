import { useContractRead } from 'wagmi';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

// Define the ABI and contract address
const contractABI = require('../abi/ahp.json');
const CONTRACT_ADDRESS = '0x9273f6bA407126ec93b59ec9126D8df40a4B8F11';

export function useMyPets(address: any, enabled:any) {

  useEffect(() => {
    if (!enabled) return;
  }, [enabled]);
  
  if(!address || address=='null' || address==null){
      address="0x000000000000000000000000000000000000dEaD"
  }

  const { data, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'getMyPets',
    args: [address]
  });
    
  return {
    pets: data,
    error: isError,
    loading: isLoading
  };
}
