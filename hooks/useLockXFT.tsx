import { useSendTransaction, useFeeData } from 'wagmi';
import { useCallback } from 'react';
import { ethers, parseUnits } from 'ethers'; // Proper import of ethers utilities

import contractABI from '../abi/ahp.json';  // Make sure this path is correct
const CONTRACT_ADDRESS = '0x9273f6bA407126ec93b59ec9126D8df40a4B8F11';

export function useLockXFT(address:any, contract:any, nftid:any, petID:any, timestamp:any, enabled:any) {
  const iface = new ethers.Interface(contractABI);
  let encodedData:any
  if(petID=="" || !petID || petID == null){
    petID = 0;
  }
  if(timestamp=="" || !timestamp || timestamp == null){
    timestamp = 0;
  }
  if(nftid=="" || !nftid || nftid == null){
    nftid = 0;
  }
  if(!address ||address=='null' || address==null){
      address="0x000000000000000000000000000000000000dEaD"
  }
  if(!contract ||contract=='null' || contract==null){
    contract="0x000000000000000000000000000000000000dEaD"
  }   
      encodedData = iface.encodeFunctionData('lockNFT', [contract, nftid,petID, timestamp]);
      const { sendTransaction, dataLX, isLoadingLX, isSuccessLX, errorLX }:any = useSendTransaction();
      const { data: feeData, isError: feeError, isLoading: feeLoading }:any = useFeeData();

      const lockX = () => {
          sendTransaction({
              to: CONTRACT_ADDRESS,
              data: encodedData,
              gasPrice: feeData.gasPrice
          });
      };
      
      return {
          lockX,
          dataLX,
          isLoadingLX,
          isSuccessLX,
          errorLX
      };

}
