import { useSendTransaction, useFeeData } from 'wagmi';
import { useRouter } from 'next/router';
import { useCallback,useEffect } from 'react';
import { ethers, parseUnits } from 'ethers'; // Proper import of ethers utilities

const contractABI = require('../abi/ahp.json');  // Adjust the path to your ABI file
const CONTRACT_ADDRESS = '0x9273f6bA407126ec93b59ec9126D8df40a4B8F11';  // Replace with your contract's address


export function useWithdrawXFT(address:any, contract:any, nftid:any, amount:any, petID:any, enabled:any) {
    useEffect(() => {
        if (!enabled) return;
    }, [enabled]);
  
  const iface = new ethers.Interface(contractABI);
  let encodedData:any
  if(petID=="" || !petID || petID == null){
    petID = 0;
  }
  if(amount=="" || !amount || amount == null){
    amount = 0;
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
      
      encodedData = iface.encodeFunctionData('withdrawNFT', [petID, contract, nftid, amount]);
      const { sendTransaction, data, isLoading, isSuccess, error } = useSendTransaction();
      const { data: feeData, isError: feeError, isLoading: feeLoading }:any = useFeeData();
      let isLoadingX = isLoading;
      let isSuccessX = isSuccess;
      let errorX:any = error;
      let dataX:any = data

      const withdrawX = () => {
          sendTransaction({
              to: CONTRACT_ADDRESS,
              data: encodedData,
              gasPrice: feeData.gasPrice
          });
      };
      
      return {
          withdrawX,
          dataX,
          isLoadingX,
          isSuccessX,
          errorX
      };

}

