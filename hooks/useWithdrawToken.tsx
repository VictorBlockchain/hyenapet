import { useSendTransaction, useFeeData } from 'wagmi';
import { useRouter } from 'next/router';
import { useCallback,useEffect } from 'react';
import { ethers, parseUnits } from 'ethers'; // Proper import of ethers utilities

const contractABI = require('../abi/ahp.json');  // Adjust the path to your ABI file
const CONTRACT_ADDRESS = '0x9273f6bA407126ec93b59ec9126D8df40a4B8F11';  // Replace with your contract's address


export function useWithdrawToken(address:any, token:any, amount:any, petID:any, enabled:any) {
    useEffect(() => {
        if (!enabled) return;
    }, [enabled]);

  const iface = new ethers.Interface(contractABI);
  let encodedData:any
  if(petID=="" || !petID || petID == null){
    petID = 0;
}
if(amount=="" || !amount || amount==null){
  amount = 0;
}
  if(!token ||token=='null' || token==null){
    token="0x000000000000000000000000000000000000dEaD"
}
  if(!address ||address=='null' || address==null){
      address="0x000000000000000000000000000000000000dEaD"
  }
        amount = parseFloat(amount)
        amount = parseUnits(amount.toString(), 'ether')
      encodedData = iface.encodeFunctionData('withdrawToken', [petID, token, amount]);
      const { sendTransaction, data, isLoading, isSuccess, error } = useSendTransaction();
      const { data: feeData, isError: feeError, isLoading: feeLoading }:any = useFeeData();
      
      let isLoadingT = isLoading;
      let isSuccessT = isSuccess;
      let errorT:any = error;
      let dataT:any = data

      const withdrawT = () => {
          sendTransaction({
              to: CONTRACT_ADDRESS,
              data: encodedData,
              gasPrice: feeData.gasPrice
          });
      };
      
      return {
          withdrawT,
          dataT,
          isLoadingT,
          isSuccessT,
          errorT
      };

}

