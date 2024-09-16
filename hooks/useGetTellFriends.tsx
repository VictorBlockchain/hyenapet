import { useCallback,useEffect } from 'react';
import { useContractRead } from 'wagmi';
const contractABI = require('../abi/ahp.json');  // Adjust the path to your ABI file
const CONTRACT_ADDRESS = '0x9273f6bA407126ec93b59ec9126D8df40a4B8F11';  // Replace with your contract's address

export function useGetTellFriends(enabled:any) {

    useEffect(() => {
        if (!enabled) return;
    }, [enabled]);

  // Read the TELLERVAULT value
  const { data: vault, isLoading: isLoadingVault, error: errorVault } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'TELLERVAULT',
  });

  // Read the topTellerGoal value
  const { data: goal, isLoading: isLoadingGoal, error: errorGoal } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'topTellerGoal',
  });

  // Read the topTeller value
  const { data: topTeller, isLoading: isLoadingTopTeller, error: errorTopTeller } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'topTeller',
  });

  // Read the topTellerCount value
  const { data: topTellerCount, isLoading: isLoadingTopTellerCount, error: errorTopTellerCount } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'topTellerCount',
  });

  // Aggregating loading and error states
  const isLoadingTF = isLoadingVault || isLoadingGoal || isLoadingTopTeller || isLoadingTopTellerCount;
  const errors = [errorVault, errorGoal, errorTopTeller, errorTopTellerCount].filter(Boolean);

  // Combine the data into a single object
  const referralStats = {
    vault: vault,
    goal: goal,
    topTeller: topTeller,
    topTellerCount: topTellerCount
  };
  
  return {
    referralStats,
    isLoadingTF,
    errors
  };
}
