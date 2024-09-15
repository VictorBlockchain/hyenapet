import { useSendTransaction,useFeeData } from 'wagmi';
import { ethers, parseUnits } from 'ethers'; // Proper import of ethers utilities
import contractABI from '../abi/ahp.json'; // Import your contract ABI

const CONTRACT_ADDRESS = '0x9273f6bA407126ec93b59ec9126D8df40a4B8F11';

export function useMintTo(quantity:any, mintPrice:any, address:any) {
    const iface = new ethers.Interface(contractABI);
    let encodedData:any
    if(quantity==""){
        quantity = 0;
    }
    if(!address ||address=='null' || address==null){
        address="0x000000000000000000000000000000000000dEaD"
    }
        
        encodedData = iface.encodeFunctionData('mintTo', [address, quantity]);
        const { sendTransaction, data, isLoading, isSuccess, error } = useSendTransaction();
        const { data: feeData, isError: feeError, isLoading: feeLoading }:any = useFeeData();

        const mintTokens = () => {
            const finalMintPrice = parseFloat(mintPrice) * parseFloat(quantity);
            const finalMintPriceWei = finalMintPrice / 10**18;
            sendTransaction({
                to: CONTRACT_ADDRESS,
                data: encodedData,
                value: parseUnits(finalMintPriceWei.toString(), 'ether'),
                gasPrice: feeData.gasPrice
            });
        };
        
        return {
            mintTokens,
            data,
            isLoading,
            isSuccess,
            error
        };

}

