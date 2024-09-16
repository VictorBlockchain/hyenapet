import { useContractRead } from 'wagmi';
import axios from 'axios';
import { useState, useEffect } from 'react';

// Define the ABI and contract address
const contractABI = require('../abi/ahp.json');  // Adjust the path to your ABI file
const CONTRACT_ADDRESS = '0x9273f6bA407126ec93b59ec9126D8df40a4B8F11';  // Replace with your contract's address

export function usePetDetails(petId:any) {
  // State for storing detailed pet data
  const [petData, setPetData]:any = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [errorDetails, setErrorDetails]:any = useState(null);

  // First, read the basic pet data from the contract
  const { data: basicPetData, error, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'getPET',
    args: [petId],
    enabled: petId > 0,  // Only attempt the read if a valid petId is provided
  });

  // Fetch detailed pet data based on basic data received from the contract
  useEffect(() => {
    const fetchPetDetails = async () => {
      if (!basicPetData) return;  // Do nothing if basic data isn't loaded

      try {
        setLoadingDetails(true);
        const response = await axios.get(basicPetData[5]);  // Assuming basicPetData[5] is the URL for details
        // console.log(basicPetData)
        const detailedData:any = {
          owner: basicPetData[0],
          bag: basicPetData[1],
          bnb: basicPetData[2].toString(),
          bnblocked: basicPetData[3],
          bnbunlockdate: basicPetData[4].toString(),
          image: response.data.image,
          description: response.data.description,
          attributes: response.data.attributes,
          name:response.data.name
        };
        setPetData(detailedData);
        setLoadingDetails(false);
      } catch (err:any) {
        console.error('Failed to fetch detailed pet data:', err);
        setErrorDetails(err);
        setLoadingDetails(false);
      }
    };

    fetchPetDetails();
  }, [basicPetData]);

  return {
    userpet: petData,
    isLoading: isLoading || loadingDetails,
    isError: error || errorDetails,
  };
}
