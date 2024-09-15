import { useContractRead } from 'wagmi';
import contractABI from '../abi/ahp.json';
const CONTRACT_ADDRESS = '0x9273f6bA407126ec93b59ec9126D8df40a4B8F11';

export function useMintPrice() {
    // useContractRead hook to fetch the mint price
    const { data, isError, isLoading } = useContractRead({
      address: CONTRACT_ADDRESS,
      abi: contractABI,
      functionName: 'MINT_PRICE',
      watch: false
    });
  
    const mintPrice = data ? data.toString() : null;
  
    return {
      mintPrice,
      isLoading,
      isError
    };
  }
