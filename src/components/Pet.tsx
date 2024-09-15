import React, { Component } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Modal from './Modal';
import {useCallback, useEffect, useState} from 'react'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAccount,useContractRead } from 'wagmi'
import { usePetDetails } from '../hooks/useGetPet'; 
import { useLockBNB } from '../hooks/useLockBNB'; 
import { useLockToken } from '../hooks/useLockToken'; 
import { useLockWallet } from '../hooks/useLockWallet'; 
import { useLockXFT } from '../hooks/useLockXFT'; 
import { useWithdrawXFT } from '../hooks/useWithdrawXFT'; 
import { useWithdrawToken } from '../hooks/useWithdrawToken'; 
import { useWithdrawBNB } from '../hooks/useWithdrawBNB'; 
import { useGetWalletLock} from '../hooks/useGetWalletLock'; 
import { time } from 'console';
import { useMintTo } from '../hooks/useMintTo';
import { useMintPrice } from '../hooks/useMintPrice';
import moment from 'moment';

const CONTRACT_ADDRESS = '0x9273f6bA407126ec93b59ec9126D8df40a4B8F11';
const contractABI = require('../abi/ahp.json');

const PET = () => {
    const router = useRouter()
    const {address, isConnecting, isDisconnected } = useAccount()
    const [isLockWalletModalOpen, setIsLockWalletModalOpen]:any = useState(false);
    const [isLockTokenModalOpen, setIsLockTokenModalOpen]:any = useState(false);
    const [isLockBNBModalOpen, setIsLockBNBModalOpen]:any = useState(false);
    const [isLockNFTModalOpen, setIsLockNFTModalOpen]:any = useState(false);
    const [isWBNBModalOpen, setIsWBNBModalOpen]:any = useState(false);
    const [isWTOKENModalOpen, setIsWTOKENModalOpen]:any = useState(false);
    const [isWNFTModalOpen, setIsWNFTModalOpen]:any = useState(false);
    const [actionType, setActionType]:any = useState(0);
    const [selectedDateTime, setSelectedDateTime]:any = useState(null);
    const [timeStamp, setTimeStamp]:any = useState(null);
    const [token, setToken]:any = useState(null);
    const [contract, setContract]:any = useState(null);
    const [nftid, setNFTID]:any = useState(null);
    const [enabled, setEnabled] = useState(false);
    const [enabledWB, setEnabledWB] = useState(false);
    const [enabledWT, setEnabledWT] = useState(false);
    const [enabledWX, setEnabledWX] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState(false);
    const [isMintModalOpen, setIsMintModalOpen] = useState(false);
    const [quantity, setQuantity]:any = useState(1);
    const { mintPrice, isLoading: isPriceLoading, isError: isPriceError }:any = useMintPrice();
    const { mintTokens, isLoading: isMintLoading, isSuccess, error } = useMintTo(quantity, mintPrice,address);
    const isLoadings = isPriceLoading || isMintLoading;
    const isDisabled = isLoadings || !mintPrice || mintPrice <= 0;
    
    // const [userpet, setUserPet]:any = useState(null)

    const [isAgreed, setIsAgreed]:any = useState(false);
    // const [userpets, setUserPets]:any = useState(null)
    // const [userpet, setUserPet]:any = useState(null)
    
    const [petID, setPetID]:any = useState(null)

    const { pet }:any = useRouter().query;
    
    useEffect(()=>{
      $('.cs-tabs.cs-fade_tabs .cs-tab_links a').on('click', function (e:any) {
      var currentAttrValue = $(this).attr('href');
      $('.cs-tabs ' + currentAttrValue)
        .fadeIn(400)
        .siblings()
        .hide();
      $(this).parents('li').addClass('active').siblings().removeClass('active');
      e.preventDefault();
    });
}, [])
const handleInputChange = (event:any) => {
  // Prevent the default behavior when the Backspace key is pressed
  if (event.key === 'Backspace' && !event.target.value) {
      event.preventDefault();
  } else {
      // Update the quantity state with the input value
      setQuantity(event.target.value);
  }
};
const handleSubmit = (event:any) => {
  event.preventDefault();
  if (quantity > 0 && quantity <= 6 && !isDisabled) {
      mintTokens();
  } else {
      alert("Please enter a valid quantity (1 to 6).");
  }
};

const handleEnable = useCallback(() => {
  setEnabled(true);  // Enable the hook to run its process
}, []);
const handleSelectChange = (event:any) => {
  // The value from the select element will be a string, so you need to compare with string values
  setIsAgreed(event.target.value === "1");
};

function handleOpenLockWalletModal() {
  setIsLockWalletModalOpen(true);
}
function handleCloseLockWalletModal() {
  setIsLockWalletModalOpen(false);
}
function handleOpenLockTokenModal() {
  setIsLockTokenModalOpen(true);
}
function handleCloseLockTokenModal() {
  setIsLockTokenModalOpen(false);
}
function handleOpenLockBNBModal() {
  setIsLockBNBModalOpen(true);
}
function handleCloseLockBNBModal() {
  setIsLockBNBModalOpen(false);
}
function handleOpenLockNFTModal() {
  setIsLockNFTModalOpen(true);
}
function handleCloseLockNFTModal() {
  setIsLockNFTModalOpen(false);
}
    
function handleOpenWBNBModal() {
  setIsWBNBModalOpen(true);
}
function handleCloseWBNBModal() {
  setIsWBNBModalOpen(false);
} 
function handleOpenWTOKENModal() {
  setIsWTOKENModalOpen(true);
}
function handleCloseWTOKENModal() {
  setIsWTOKENModalOpen(false);
}
function handleOpenWNFTModal() {
  setIsWNFTModalOpen(true);
}
function handleCloseWNFTModal() {
  setIsWNFTModalOpen(false);
}  
      
    
    useEffect(() => {
      const getPetID = () => {
        if (router.isReady && router.query.pet !== undefined && pet.length>1) {
          setPetID(pet[1])
          if(address){
            //start(pet[1])
          }
        }
      }
      getPetID()
    }, [router.isReady, address])
    
     
     const { userpet, isLoading, isError }:any = usePetDetails(petID);
     const { walletLock, loadingW, errorW }:any = useGetWalletLock(petID,true);
     const { lockW, dataLW, isLoadingLW, isSuccessLW, errorLW } = useLockWallet(address, petID, timeStamp, enabled);
     const { lockT, dataLT, isLoadingLT, isSuccessLT, errorLT } = useLockToken(address, token, petID, timeStamp, enabled);
     const { lockB, dataLB, isLoadingLB, isSuccessLB, errorLB } = useLockBNB(address, petID, timeStamp, enabled);
     const { lockX, dataLX, isLoadingLX, isSuccessLX, errorLX } = useLockXFT(address,contract, nftid, petID, timeStamp, enabled);
     const { withdrawB, dataB, isLoadingB, isSuccessB, errorB } = useWithdrawBNB(address,withdrawAmount, petID, enabledWB);
     const { withdrawT, dataT, isLoadingT, isSuccessT, errorT } = useWithdrawToken(address, token, withdrawAmount, petID, enabledWT);
    //  const { withdrawX, dataX, isLoadingX, isSuccessX, errorX } = useWithdrawXFT(address, contract, nftid, withdrawAmount, petID, enabledWX);
     const currentTime = Math.floor(Date.now() / 1000);
     
    //  const formattedDate = moment(userpet.pet.bnbunlockdate).format('MMMM Do YYYY, h:mm:ss a');   
      console.log(userpet)
      console.log(walletLock)
      
      const handleAgreeChange = (event:any) => {
        setIsAgreed(event.target.value === "0");
      };
      const handleDateTimeSubmit = (event:any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
            const now = new Date();
            const minDate = new Date(now.getTime() + 5 * 60 * 1000);
            if (selectedDateTime < minDate) {
                alert("Selected date and time must be at least 5 minutes in the future.");
                return;
              }
        if (isAgreed) {
            
            const timestamp = Math.floor(selectedDateTime.getTime() / 1000);
            
            setTimeStamp(timestamp)
            const type_ = formData.get('type_');
            // alert(type_)
            if(!timestamp){
                alert("Please select a date and time.");
                return;
            }else{
                
                if(type_ === "1"){
                  setEnabled(true)
                  if(userpet.bnb>0){
                    lockB()

                  }else{
                    alert("vault has no BNB to lock")
                  }
                }
                if(type_ === "2"){
                    
                    const contractAddress = formData.get('contractAddress');
                    setToken(contractAddress)
                    if(!contractAddress){
                        alert("whats the token address?");
                        return;
                    }else{
                      setEnabled(true)
                        lockT()
                    
                    }
                }
                if(type_ === "3"){
                    const contractAddress = formData.get('contractAddress');
                    const nftid = formData.get('nftid');
                    setNFTID(nftid)
                    setContract(contractAddress)
                    if(!contractAddress){
                        alert("whats the token address?");
                        return;
                    }else if(!nftid){
                        alert("whats the nft id?");
                        return;
                     }else{
                      setEnabled(true)
                      lockX()
                     }
                }
                if(type_ === "4"){
                  setEnabled(true)
                  lockW();
              }
            
            }
          

          } else {
            alert("Please agree to the terms before submitting the form.");
          }
      }
      
      const handleDateTimeChange = (dateTime:any) => {
        setSelectedDateTime(dateTime);
      }
      
      const handleWithdrawBNB = (event:any) => {
        event.preventDefault();
        const formData:any = new FormData(event.target);
        const amount:any = formData.get('amount');
        if(!amount){
            alert("whats the bnb amount?");
            return;
        }else{
          if (address && router.isReady) {
              setWithdrawAmount(amount)
              setEnabledWB(true)
              withdrawB()
              //useWithdrawBNB(address,amount,petID)
          };
        }
  
      }
      
      const handleWithdrawToken = (event:any) => {
        event.preventDefault();
        
        try {
          
          const formData = new FormData(event.target);
          const contractAddress = formData.get('contractAddress');
          const amount:any = formData.get('amount');
          if(!contractAddress){
              alert("whats the token address?");
              return;
          }else if(!amount){
              alert("whats the amount?");
              return;
          }else{
            
            if (address && router.isReady) {
              setToken(contractAddress)
              setWithdrawAmount(amount)
              setEnabledWT(true)
              withdrawT()
              //useWithdrawToken(address,contractAddress,amount,petID)
            };
          
          }
        
        }catch(error){
          console.log(error)
        }
      }
      
      const handleWithdrawNFT = (event:any) => {
        event.preventDefault();
        const formData:any = new FormData(event.target);
        const contractAddress = formData.get('contractAddress');
        const nftid = formData.get('nftid');
        const amount:any = formData.get('amount');
        if(!contractAddress){
            alert("whats the token address?");
            return;
        }else if(!nftid){
            alert("whats the nftid?");
            return;
        }else if(!amount){
            alert("whats the amount?");
            return;
        }else{
          
          if (address && router.isReady) {

            setContract(contractAddress)
            setNFTID(nftid)
            setEnabledWX(true)
            setWithdrawAmount(amount)
            //  withdrawX()
             //useWithdrawXFT(address,contractAddress,nftid,amount,petID)

          };
        }
  
      }
      function handleOpenMintModal(event:any) {
        event.preventDefault();
        setIsMintModalOpen(true);
      }
      
      function handleCloseMintModal() {
        setIsMintModalOpen(false);
      }
      return (
        <>
          <div className="cs-height_90 cs-height_lg_80"></div>
          <section className="cs-page_head cs-bg">
            <div className="container">
              <div className="text-center">
                <h1 className="cs-page_title" style={{color:'white',fontFamily: 'Comfortaa'}}>Pet Details</h1>
                <ol className="breadcrumb">
                <li className="breadcrumb-item"  style={{color:'white',fontFamily: 'Comfortaa'}}><a href="/">Home</a></li>
                <li className="breadcrumb-item" style={{color:'white',fontFamily: 'Comfortaa'}}><a href="#" onClick={handleOpenMintModal}>Mint More</a></li>
                
                </ol>
              </div>
            </div>
          </section>
          <div className="cs-height_100 cs-height_lg_70"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div style={{width: '100%', display: 'inline-block'}}>
                  {userpet && (
                        <div className='cs-slider_thumb_lg'>
                        <img
                          src={userpet.image}
                          alt="Image"
                          className="cs-zoom_item"
                          width='600'
                          height='600'
                          
                      />
                      </div>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="cs-height_0 cs-height_lg_40"></div>
                <div className="cs-single_product_head" style={{color:'white',fontFamily: 'Comfortaa'}}> 
                  {pet && pet[1] && ( <h2 style={{color:'white',fontFamily: 'Comfortaa'}}>#{pet[1]}</h2>)}
                  {userpet && userpet.owner && (<p style={{color:'white',fontFamily: 'Comfortaa'}}><span className="cs-accent_color">Vault</span> · {`${userpet.bag.slice(0, 4)}...${userpet.bag.slice(-5)}`}</p>)}
                  {userpet && userpet.owner && ( <span className="cs-card_like cs-primary_color cs-box_shadow" style={{color:'black',fontFamily: 'Comfortaa'}}>
                  <i className="fab fa-btc"></i>
                    {userpet.bnb/1000000000000000000 || 0}
                  </span>)}
                </div>
                <div className="cs-height_0 cs-height_lg_40"></div>

                <div className="row">
                  <div className="col-xl-6">
                  <div className="cs-height_25 cs-height_lg_25"></div>
                  <div className="cs-author_card cs-white_bg cs-box_shadow">
                  
                  <div className="cs-author_right">
                  <h3>Owner</h3>
                  {userpet && userpet.owner && (  <p>{`${userpet.owner.slice(0, 4)}...${userpet.owner.slice(-5)}`}</p>)}
                  </div>
                  </div>
                  <div className="cs-height_25 cs-height_lg_25"></div>
                  </div>
                  {/* <div className="col-xl-6">
                  <div className="cs-height_25 cs-height_lg_25"></div>
                  <div className="cs-author_card cs-white_bg cs-box_shadow">
                  <div className="cs-author_img">
                  <Image
                      src="/img/avatar_14.png"
                      alt="Image"
                      className="cs-zoom_item"
                      width='50'
                      height='50' 
                  /> 
                    </div>
                  <div className="cs-author_right">
                  <h3>Audiography</h3>
                  <p>@Stanford V. McCutcheon</p>
                  </div>
                  </div>
                  <div className="cs-height_25 cs-height_lg_25"></div>
                  </div> */}
                </div>
              
                <div className="cs-tabs cs-fade_tabs cs-style1">
                  <div className="cs-medium">
                  <ul className="cs-tab_links cs-style1 cs-medium cs-primary_color cs-mp0 cs-primary_font">
                  <li className="active" style={{color:'white',fontFamily: 'Comfortaa'}}><a href="#Description">Attributes</a></li>
                  <li className=""><a href="#Details" style={{color:'white',fontFamily: 'Comfortaa'}}>Vault Actions</a></li>
                  </ul>
                  </div>
                  <div className="cs-height_20 cs-height_lg_20"></div>
                  <div className="cs-tab_content">
                  <div id="Description" className="cs-tab active" style={{}}>
                  <div className="cs-white_bg cs-box_shadow cs-general_box_5">
                  {userpet && userpet.owner && (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr>
                          <th style={{ textAlign: 'left', padding: '8px', backgroundColor: '#080326' }}>Trait Type</th>
                          <th style={{ textAlign: 'left', padding: '8px', backgroundColor: '#080326' }}>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ backgroundColor: '##080326' }}>
                          <td style={{ textAlign: 'left', padding: '8px' }}>BNB Balance</td>
                          <td style={{ textAlign: 'left', padding: '8px' }}>{userpet.bnb}</td>
                        </tr>
                        <tr style={{ backgroundColor: '#080326' }}>
                          <td style={{ textAlign: 'left', padding: '8px' }}>BNB Unlocked Date</td>
                          <td style={{ textAlign: 'left', padding: '8px' }}>{userpet.bnbunlockdate}</td>
                        </tr>
                        {userpet.attributes.map((attribute:any, index:any) => (
                          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#341138' : '#080326' }}>
                            <td style={{ textAlign: 'left', padding: '8px' }}>{attribute.trait_type}</td>
                            <td style={{ textAlign: 'left', padding: '8px' }}>{attribute.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  </div>
                  </div>
                  <div id="Details" className="cs-tab" style={{display: 'none'}}>
                  <div className="cs-white_bg cs-box_shadow cs-general_box_5">
                  <div className="row mb-4">
                      <div className="col-12">
                        {userpet && walletLock  && currentTime > Number(walletLock.walletUnlockDate) && (
                            <a href="#" className="cs-btn cs-style1 cs-btn_lg w-100 text-center" onClick={handleOpenLockWalletModal}><span>Lock Vault</span></a>
                        )}
                        {userpet && walletLock && currentTime < Number(walletLock.walletUnlockDate)  && (
                            <p className="text-center" style={{color:'black', fontFamily: 'Comfortaa'}} >wallet is locked until <br/>{moment.unix(Number(walletLock.walletUnlockDate)).format('MMMM Do YYYY, h:mm:ss a')}</p>
                          )}
                      </div>
                    
                    </div>
                  <div className="row">
                      <div className="col-6">
                        <a href="#" className="cs-btn cs-style1 cs-btn_lg w-100 text-center" onClick={handleOpenLockTokenModal}><span>Lock Token</span></a>
                      </div>
                      <div className="col-6">
                        {userpet  && currentTime > Number(userpet.bnbunlockdate) && (
                            <a href="#" className="cs-btn cs-style1 cs-btn_lg w-100 text-center" onClick={handleOpenLockBNBModal}><span>Lock BNB</span></a>
                        )}
                        {userpet && userpet.bnbunlockdate >0 && currentTime < Number(userpet.bnbunlockdate)  && (
                            <p className="text-center" style={{color:'black', fontFamily: 'Comfortaa', fontSize:'13px'}}>bnb is locked until <br/>{moment.unix(Number(userpet.bnbunlockdate)).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        )}
                      </div>
                    </div>
                    <div className="cs-height_30 cs-height_lg_30"></div>
                    <div className="row">
                      <div className="col-6">
                        <a href="#" className="cs-btn cs-style1 cs-btn_lg w-100 text-center" onClick={handleOpenLockNFTModal}><span>Lock NFT</span></a>
                      </div>
                      <div className="col-6">
                      {userpet  && currentTime > Number(userpet.bnbunlockdate) && (
                          <a href="#" className="cs-btn cs-style1 cs-btn_lg w-100 text-center" onClick={handleOpenWBNBModal}><span>W/BNB</span></a>
                      )}
                        {userpet && userpet.bnbunlockdate >0 && currentTime < Number(userpet.bnbunlockdate)  && (
                            <p className="text-center" style={{color:'black', fontFamily: 'Comfortaa', fontSize:'13px'}}>bnb is locked until <br/>{moment.unix(Number(userpet.bnbunlockdate)).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        )}
                      </div>
                    </div>
                    <div className="cs-height_30 cs-height_lg_30"></div>
                    
                    <div className="row">
                      <div className="col-6">
                        <a href="#" className="cs-btn cs-style1 cs-btn_lg w-100 text-center" onClick={handleOpenWTOKENModal}><span>W/Token</span></a>
                      </div>
                      <div className="col-6">
                        <a href="#" className="cs-btn cs-style1 cs-btn_lg w-100 text-center" onClick={handleOpenWNFTModal}><span>W/NFT</span></a>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>
                </div>
                <div className="cs-height_70 cs-height_lg_70"></div>
                <div className="row">
                <div className="col-6">
                    <a href="https://opensea.io/collection/hyena-pets" target='_blank' className="cs-btn cs-style1 cs-btn_lg w-100 text-center"><span>Sell On OpenSea</span></a>
                  </div>
                  <div className="col-6">
                    <a href="https://xft.red" className="cs-btn cs-style1 cs-btn_lg w-100 text-center"><span>Sell On XFT</span></a>
                  </div>
                </div>
                <div className="row mt-4">
                <div className="col-12">
                    {userpet && userpet.owner && (<a href={`https://bscscan.com/address/${userpet.bag}`} target='_blank' className="cs-btn cs-style1 cs-btn_lg w-100 text-center"><span>View Vault</span></a>)}
                  </div>
                </div>
              
              
              </div>
            </div>
          </div>
          
          {isLockWalletModalOpen &&  
            <Modal onClose={handleCloseLockWalletModal} title="Lock Wallet">
            <div className="cs-bid_input_group2 text-center">
            <form onSubmit={handleDateTimeSubmit}>
                <div className="cs-height_25 cs-height_lg_25"></div>
                <p className="text-center">Select date to unlock</p>
                
                <DatePicker
                  placeholderText='lock until'
                  className='cs-form_field'
                  selected={selectedDateTime}
                  onChange={handleDateTimeChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="dd/MM/yyyy HH:mm"
                  minDate={new Date()}
                  isClearable
                  />
                  <input type="hidden" name="type_" value="4"></input>
                  <div className="cs-height_25 cs-height_lg_25"></div>
                  <p className="text-center">You will not be able to change the unlock date</p>
                  <div className="cs-form_field_wrap cs-select_arrow">
                    <select className="cs-form_field" onChange={handleSelectChange} value={isAgreed ? "1" : "2"}>
                      <option value="1">I Agree</option>
                      <option value="2">No</option>
                    </select>
                  </div>
                  <div className="cs-height_25 cs-height_lg_25"></div>          
                  <button className="cs-btn cs-style1 cs-btn_lg w-100" type='submit'><span>Lock Wallet</span></button>
            
            </form>
            </div>  
            </Modal> } 

          {isLockTokenModalOpen &&  
            <Modal onClose={handleCloseLockTokenModal} title="Lock Token">
            <p className="text-center">Enter token contract address</p>
            <div className="cs-bid_input_group2 text-center">
            <form onSubmit={handleDateTimeSubmit}>
                
                <input type="text" className="cs-form_field" placeholder="token contract" name="contractAddress" />
                <div className="cs-height_25 cs-height_lg_25"></div>
                <p className="text-center">Select date to unlock</p>
                
                <DatePicker
                  placeholderText='lock until'
                  className='cs-form_field'
                  selected={selectedDateTime}
                  onChange={handleDateTimeChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="dd/MM/yyyy HH:mm"
                  minDate={new Date()}
                  isClearable
                  />
                  <input type="hidden" name="type_" value="2"></input>
                  <div className="cs-height_25 cs-height_lg_25"></div>
                  <p className="text-center">You will not be able to change the unlock date</p>
                  <div className="cs-form_field_wrap cs-select_arrow">
                    <select className="cs-form_field" onChange={handleSelectChange} value={isAgreed ? "1" : "2"}>
                      <option value="1">I Agree</option>
                      <option value="2">No</option>
                    </select>
                  </div>
                  <div className="cs-height_25 cs-height_lg_25"></div>

                  <button className="cs-btn cs-style1 cs-btn_lg w-100" type='submit'><span>Lock Token</span></button>

            </form>
            </div>  
            <div className="cs-height_25 cs-height_lg_25"></div>          
            </Modal> } 

            {isLockBNBModalOpen &&  
            <Modal onClose={handleCloseLockBNBModal} title="Lock BNB">
            <p className="text-center">Select date to unlock</p>
            <div className="cs-bid_input_group2 text-center">
            <form onSubmit={handleDateTimeSubmit}>

              <DatePicker
                  placeholderText='lock until'
                  className='cs-form_field'
                  selected={selectedDateTime}
                  onChange={handleDateTimeChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="dd/MM/yyyy HH:mm"
                  minDate={new Date()}
                  isClearable
                  />
                  <input type="hidden" name="type_" value="1"></input>
                  <div className="cs-height_25 cs-height_lg_25"></div>
                  <p className="text-center">You will not be able to change the unlock date</p>

                  <div className="cs-form_field_wrap cs-select_arrow">
                    <select className="cs-form_field" onChange={handleSelectChange} value={isAgreed ? "1" : "2"}>
                      <option value="1">I Agree</option>
                      <option value="2">No</option>
                    </select>
                  </div>
                  <div className="cs-height_25 cs-height_lg_25"></div>

                  <button className="cs-btn cs-style1 cs-btn_lg w-100" type='submit'><span>Lock BNB</span></button>

                </form>
            </div>
            <div className="cs-height_25 cs-height_lg_25"></div>            
            </Modal> } 
            
            {isLockNFTModalOpen &&  
            <Modal onClose={handleCloseLockNFTModal} title="Lock NFT">
            <p className="text-center">Enter NFT contract address</p>
            <div className="cs-bid_input_group2 text-center">
            <form onSubmit={handleDateTimeSubmit}>
                
                <input type="text" className="cs-form_field" placeholder="token contract" name="contractAddress" />
                <div className="cs-height_25 cs-height_lg_25"></div>
                <p className="text-center">NFT ID</p>
                <input type="text" className="cs-form_field" placeholder="token contract" name="contractAddress" />
                <div className="cs-height_25 cs-height_lg_25"></div>
                
                <p className="text-center">Select date to unlock</p>
                
                <DatePicker
                  placeholderText='lock until'
                  className='cs-form_field'
                  selected={selectedDateTime}
                  onChange={handleDateTimeChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="dd/MM/yyyy HH:mm"
                  minDate={new Date()}
                  isClearable
                  />
                  <input type="hidden" name="type_" value="3"></input>
                  <div className="cs-height_25 cs-height_lg_25"></div>
                  <p className="text-center">You will not be able to change the unlock date</p>
                  <div className="cs-form_field_wrap cs-select_arrow">
                    <select className="cs-form_field" onChange={handleSelectChange} value={isAgreed ? "1" : "2"}>
                      <option value="1">I Agree</option>
                      <option value="2">No</option>
                    </select>
                  </div>
                  <div className="cs-height_25 cs-height_lg_25"></div>

                  <button className="cs-btn cs-style1 cs-btn_lg w-100" type='submit'><span>Lock NFT</span></button>

            </form>            
            <div className="cs-height_25 cs-height_lg_25"></div>
            
            </div>
            
            </Modal> } 

            {isWBNBModalOpen &&  
            <Modal onClose={handleCloseWBNBModal} title="Withdraw BNB">
            <p className="text-center">Enter withdraw amount</p>
            <div className="cs-bid_input_group2 text-center">
              <form onSubmit={handleWithdrawBNB}>
                <input type="text" className="cs-form_field" placeholder="withdraw amount" name="amount" />
                <div className="cs-height_25 cs-height_lg_25"></div>
                <button className="cs-btn cs-style1 cs-btn_lg w-100" type="submit"><span>Withdraw</span></button>

              </form>
            </div>            
            <div className="cs-height_20 cs-height_lg_20"></div>
            <p className="text-center">You must own Pet to withdraw from it's wallet.<br/> If you have this nft wrapped on NFTea.app<br/> unwrap it 1st</p>
            <div className="cs-height_25 cs-height_lg_25"></div>
            
            </Modal> } 
            
            {isWTOKENModalOpen &&  
            <Modal onClose={handleCloseWTOKENModal} title="Withdraw Token">
            <p className="text-center">Enter token contract address</p>
            <div className="cs-bid_input_group2 text-center">
            <form onSubmit={handleWithdrawToken}>
              <input type="text" className="cs-form_field" placeholder="contract address" name="contractAddress" />
              
              <div className="cs-height_25 cs-height_lg_25"></div>
              <p className="text-center">Enter withdraw amount</p>
                <input type="text" className="cs-form_field" placeholder="withdraw amount" name="amount" />
              
              </form>            
            </div>            
            <div className="cs-height_20 cs-height_lg_20"></div>
            <p className="text-center">You must own Pet to withdraw from it's wallet.<br/> If you have this nft wrapped on NFTea.app<br/> unwrap it 1st</p>
            <div className="cs-height_25 cs-height_lg_25"></div>
            
            <button className="cs-btn cs-style1 cs-btn_lg w-100" onClick={handleWithdrawToken}><span>Withdraw</span></button>
            </Modal> } 

            {isWNFTModalOpen &&  
            <Modal onClose={handleCloseWNFTModal} title="Withdraw NFT">
            <p className="text-center">enter contract address of the nft to withdraw</p>
            <div className="cs-bid_input_group2 text-center">
              <form onSubmit={handleWithdrawNFT}>
                <input type="text" className="cs-form_field"  placeholder="contract address" name="contractAddress" />
                <div className="cs-height_20 cs-height_lg_20"></div>
                <p className="text-center">enter nft id</p>
                
                <input type="number" className="cs-form_field"  placeholder="nft #id" name="nftid" />
                <div className="cs-height_20 cs-height_lg_20"></div>
                <p className="text-center">enter amount</p>
                <input type="number" className="cs-form_field"  placeholder="amount" name="amount" />
            
            <div className="cs-height_20 cs-height_lg_20"></div>
            <p className="text-center">You must own Pet to withdraw from it's wallet.<br/> If you have this nft wrapped on NFTea.app<br/> unwrap it 1st</p>
            <div className="cs-height_25 cs-height_lg_25"></div>
            
            <button type="submit" className="cs-btn cs-style1 cs-btn_lg w-100" onClick={handleWithdrawNFT}><span>Withdraw</span></button>
              
              </form>
            </div>
            
            </Modal> } 

            {isMintModalOpen &&  
            <Modal onClose={handleCloseMintModal} title="Mint Yours">
            <form onSubmit={handleSubmit}>           
              <ul>
                  <li>
                  <span>Price</span>
                  <b>{mintPrice/1000000000000000000} BNB</b>
                  </li>
                  <li>
                  <span>Gas</span>
                  <b>$6 or less</b>
                  </li>
              </ul>
              <div className="cs-height_20 cs-height_lg_20"></div>
              <div className="cs-bid_input_group2 text-center">
                <label style={{color:'black'}}>mint quantity (max 6)</label><br/>
                  <input type="text" className="cs-bid_value" min="1" max="6" placeholder="mint how many?" value={quantity} onChange={handleInputChange} required/>
              </div>
              <div className="cs-height_25 cs-height_lg_25"></div>
              <div className="cs-height_20 cs-height_lg_20"></div>
              <p className="text-center">If you were told by a friend, he/she will get 20% of your mint price</p>
              <div className="cs-height_25 cs-height_lg_25"></div>
              {address && (
                   <button type="submit" className="cs-btn cs-style1 cs-btn_lg w-100"><span>Mint</span></button>
              )}
              {!address && (
                  <h3 className='text-center'>connect wallet to mint</h3>
              )}
            </form>
            </Modal> } 
        </>
      )

}
export default PET;
