import { useSendTransaction, useFeeData } from 'wagmi';
import { useCallback,useEffect } from 'react';
import { ethers, parseUnits } from 'ethers'; // Proper import of ethers utilities

import contractABI from '../abi/ahp.json';  // Make sure this path is correct
const CONTRACT_ADDRESS = '0x9273f6bA407126ec93b59ec9126D8df40a4B8F11';

export function useLockToken(address:any, token:any, petID:any, timestamp:any, enabled:any) {
    useEffect(() => {
        if (!enabled) return;
    }, [enabled]);

  const iface = new ethers.Interface(contractABI);
  let encodedData:any
  if(petID=="" || !petID || petID == null){
    petID = 0;
    }
    if(timestamp=="" || !timestamp || timestamp == null){
    timestamp = 0;
    }
  if(!address ||address=='null' || address==null){
      address="0x000000000000000000000000000000000000dEaD"
  }
  if(!token ||token=='null' || token==null){
    token="0x000000000000000000000000000000000000dEaD"
}
      
      encodedData = iface.encodeFunctionData('lockToken', [petID, timestamp,token]);
      const { sendTransaction, dataLT, isLoadingLT, isSuccessLT, errorLT }:any = useSendTransaction();
      const { data: feeData, isError: feeError, isLoading: feeLoading }:any = useFeeData();
      
      const lockT = () => {
          sendTransaction({
              to: CONTRACT_ADDRESS,
              data: encodedData,
              gasPrice: feeData.gasPrice
          });
      };
      
      return {
          lockT,
          dataLT,
          isLoadingLT,
          isSuccessLT,
          errorLT
      };

}
