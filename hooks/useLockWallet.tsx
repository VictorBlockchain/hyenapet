import { useSendTransaction, useFeeData } from 'wagmi';
import { useCallback,useEffect } from 'react';
import { ethers, parseUnits } from 'ethers'; // Proper import of ethers utilities
import contractABI from '../abi/ahp.json';  // Make sure this path is correct
const CONTRACT_ADDRESS = '0x9273f6bA407126ec93b59ec9126D8df40a4B8F11';

export function useLockWallet(address:any, petID:any, timestamp:any,enabled:any) {

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
      
      encodedData = iface.encodeFunctionData('lockWallet', [petID, timestamp]);
      const { sendTransaction, data, isLoading, isSuccess, error } = useSendTransaction();
      const { data: feeData, isError: feeError, isLoading: feeLoading }:any = useFeeData();
      
      let isLoadingLW = isLoading;
      let isSuccessLW = isSuccess;
      let errorLW:any = error;
      let dataLW:any = data
      
      const lockW = () => {
          sendTransaction({
              to: CONTRACT_ADDRESS,
              data: encodedData,
              gasPrice: feeData.gasPrice
          });
      };
      
      return {
          lockW,
          dataLW,
          isLoadingLW,
          isSuccessLW,
          errorLW
      };

}
