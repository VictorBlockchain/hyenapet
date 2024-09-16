import React from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link';
import { useState, useEffect } from 'react';
// import styles from "@/styles/Home.module.css";
import Carousel from './Slider';
import { useAccount,useContractRead } from 'wagmi'
import Modal from './Modal';
import { useMyPets } from '../hooks/getPets';
import { useTellFriends } from '../hooks/useTellFriends'; 
import { useGetTellFriends } from '../hooks/useGetTellFriends';
const CONTRACT_ADDRESS = '0x9273f6bA407126ec93b59ec9126D8df40a4B8F11';
const contractABI = require('../abi/ahp.json');


const Start = () => {
    
    const { address, isConnecting, isDisconnected } = useAccount()
    // const { pets, error, loading }:any = address ? useMyPets(address) : { pets: null, error: null, loading: false };
    const [enabledMyPets, setEnabledMyPets] = useState(false);
    const { pets, error, loading  }:any = useMyPets(address,enabledMyPets);
    
    // const { open, close } = useWeb3Modal()
    // const [contract, setContract] = useState(null);
    // const [balance, setBalance] = useState(0);
    // const [price, setPrice] = useState(false);
    // const [gas, setGas] = useState(false);
    const [isSmartModalOpen, setIsSmartModalOpen] = useState(false);
    const [isAAAModalOpen, setIsAAAModalOpen] = useState(false);
    const [isNoPetsModalOpen, setIsNoPetsModalOpen] = useState(false);
    const [myPets, setMyPets]:any = useState([])
    const [showPets, setShowPets] = useState(false)
    const [images, setImages] = useState([false])
    const [friendAddresses, setFriendAddresses]:any = useState([]);
    const [currentFriendAddress, setCurrentFriendAddress]:any = useState('');
    const [enabled, setEnabled] = useState(false);
    const { tell, isLoading, isSuccess, isError }:any = useTellFriends(address,currentFriendAddress,enabled);
    const [enabledStats, setEnabledStats] = useState(false);
    const { referralStats, isLoadingTF, errors }:any = useGetTellFriends(enabledStats);
    
    const maxImageID = 7;
    
    useEffect(() => {
        if(pets && address){
          setEnabledMyPets(true)
          start()
        }
      }, [pets, address]);
      
      useEffect(() => {
        if(myPets.length>0){
          setShowPets(true)
        }
      }, [myPets]);
    
      const handleImageLoad = (event:any) => {
        // Your custom logic for image load event
        console.log('Image loaded:', event.target);
      };
  
      
      const start = async () => {

          if(pets.length>0){
            let m_images:any = []
            
            for (let i = 0; i < pets.length; i++) {
                // console.log(pets[i])
              
              let imageUrl = `https://bafybeihplhfmazxtn7kenp7pcf6rxjligjlhpmiynealcy5k4ilkzrjaji.ipfs.nftstorage.link/${pets[i]}.png`;
              if(pets[i]){
                m_images.push(
                  <div key={i} className="col-md-3 col-lg-3 mb-3">
                  <div className="cs-card cs-style4 cs-box_shadow">
                    {/* You can add other components or styles here */}
                    <a href={`pet/${pets[i]}`} className="cs-card_thumb cs-zoom_effect">
                      <Image
                        loader={() => imageUrl}
                        src={imageUrl}
                        alt={`Image ${pets[i]}`}
                        className="cs-zoom_item"
                        width={200}
                        height={200}
                        onLoad={handleImageLoad}
                      />
                    </a>
                    <div className="cs-card_info" style={{ marginTop: '9px' }}>
                      <h3 className="cs-card_title text-center" style={{color:'white'}}>{`#${pets[i]}`}</h3>
                    </div>
                  </div>
                  </div>
                );
              }
            }
            setMyPets(m_images)
          }else{
            setShowPets(false)
            handleOpenNoPetsModal()
            setTimeout(()=>{
              handleCloseNoPetsModal()
            },3000)
            minted()
          }
        setEnabledStats(true)
        // referralStats()
      }
    
      function useContractReadMethod(methodName: string, args?: any[]) {
        return useContractRead({
          address: CONTRACT_ADDRESS,
          abi: contractABI,
          functionName: methodName,
          args: args,
        });
      }
    
      function useTELLERVAULT() {
        return useContractReadMethod('TELLERVAULT');
      }
      
      function useTopTellerGoal() {
        return useContractReadMethod('topTellerGoal');
      }
      
      function useTopTeller() {
        return useContractReadMethod('topTeller');
      }
      
      function useTopTellerCount() {
        return useContractReadMethod('topTellerCount');
      }
        
      const minted = async () => {
        let m_images:any = []
        
        for (let id = 1; id <= maxImageID; id++) {
          let imageUrl = `https://bafybeihplhfmazxtn7kenp7pcf6rxjligjlhpmiynealcy5k4ilkzrjaji.ipfs.nftstorage.link/${id}.png`;
          // console.log(imageUrl)
          m_images.push(
            <div key={id} className="col-md-2 mb-3">
            <div className="cs-card cs-style4 cs-box_shadow cs-white_bg">
              {/* You can add other components or styles here */}
              <a href={`pet/${id}`} className="cs-card_thumb cs-zoom_effect">
                <Image
                            loader={() => imageUrl} // Use loader prop
                  
                  src={imageUrl}
                  alt={`Image ${id}`}
                  className="cs-zoom_item"
                  width={200}
                  height={200}
                  onLoad={handleImageLoad}
                />
              </a>
              <div className="cs-card_info" style={{ marginTop: '9px' }}>
                <h3 className="cs-card_title text-center">#{id}</h3>
              </div>
            </div>
            </div>
          );
        }
        setImages(m_images)
      
      }
      
      const isAddressValid = (addy:any) => {
        if (addy === address) {
          return false;
        }
        
        return !friendAddresses.includes(addy);
      };
      const handleAddressChange = (e:any) => {
        setCurrentFriendAddress(e.target.value);
      };
      const handleAddAddress = () => {
        const trimmedAddress = currentFriendAddress.trim();
      
        if (trimmedAddress !== '' && isAddressValid(trimmedAddress)) {
          setFriendAddresses([...friendAddresses, trimmedAddress]);
          setCurrentFriendAddress(''); // Clear the current address after adding
        } else {
          // Handle invalid address (already added or current user's address)
          alert('Invalid address. Please enter a different address.');
        }
      };
      
      const handleTellFriend = (event:any) => {
        event.preventDefault();
        
        if(address) {
          tell()
        }
      }
      
    function handleOpenSmartModal(event:any) {
        event.preventDefault();
        setIsSmartModalOpen(true);
      }
      function handleCloseSmartModal() {
        setIsSmartModalOpen(false);
      }
      function handleOpenAAAModal(event:any) {
        event.preventDefault();
        setIsAAAModalOpen(true);
      }
      function handleCloseAAAModal() {
        setIsAAAModalOpen(false);
      }
      function handleOpenNoPetsModal() {
        setIsNoPetsModalOpen(true);
      }
      function handleCloseNoPetsModal() {
        setIsNoPetsModalOpen(false);
      }
    
    return(
        <>
        {showPets && (
          <>
          <section className="cs-page_head cs-bg" style={{backgroundImage: "url('/img/page_head_bg.svg')"}}>
            <div className="container">
              <div className="text-center">
                <h1 className="cs-page_title" style={{color:'white',fontFamily: 'Comfortaa'}}>My Pets</h1>
                <ol className="breadcrumb">
                <li className="breadcrumb-item"  style={{color:'white',fontFamily: 'Comfortaa'}}><Link href="/">Home</Link></li>
                <li className="breadcrumb-item active"  style={{color:'white',fontFamily: 'Comfortaa'}}>My Pets</li>
                </ol>
              </div>
            </div>
          </section>
          
          {(myPets.length>0) && (
            <>
              <section>
                <div className="container mt-3">
                  <div className="row mt-5">
                    {myPets}
                  </div>
                </div>
              </section>

              <section className="mt-5">
                <div className="container">
                  <div className="cs-cta cs-style2 text-center cs-accent_bg">
                  <h2 className="cs-cta_title cs-white_color_8" style={{fontFamily: 'Comfortaa'}}>Referral Bonus!</h2>
                  <div className="cs-cta_subtitle cs-white_color_8" style={{fontFamily: 'Comfortaa'}}>Tell A Friend & Get 20% Of Their Mint Fee!</div>
                  <h2 className="cs-cta_title cs-white_color_8" style={{fontFamily: 'Comfortaa', lineHeight:'63px'}}><small>up to</small> $1,000 (<small>BNB</small>) Additional Bonus! <br/>1st To Refer 30 Friends/Followers</h2>
                  <div className="cs-cta_subtitle cs-white_color_8" style={{fontFamily: 'Comfortaa'}}>Bonus Paid In Real Time!</div>
                  <div className="cs-cta_subtitle cs-white_color_8 mt-1 pt-0" style={{fontFamily: 'Comfortaa', lineHeight:'44px'}}>20% of referred mint price stored in referral vault<br/> winner gets vault balance</div>
                  
                  <hr/>
                  <div className="row mt-5">
                    <div className="col-lg-6 offset-lg-3 text-center">
                      
                    <h5 style={{fontFamily: 'Comfortaa'}}>Referral Goal: {referralStats.goal}</h5>

                    {address && (
                          <>
                            <h5 style={{fontFamily: 'Comfortaa'}}>Top Referrer: {`${referralStats.topTeller.slice(0, 4)}...${referralStats.topTeller.slice(-5)}`}</h5>
                            <h5 className="mt-3" style={{fontFamily: 'Comfortaa'}}>Top Referrer Total: {referralStats.topTellerCount}</h5><br/>                          
                          </>
                      
                      )}
                      {!address && (
                        <>
                          <h5 style={{fontFamily: 'Comfortaa'}}>Top Referrer: connect wallet to view</h5>
                          <h5 className="mt-3" style={{fontFamily: 'Comfortaa'}}>Top Referrer Total: connect to view</h5><br/>                        
                        </>
                      )}
                      
                      <h5 style={{fontFamily: 'Comfortaa'}}>Vault: <a href="https://bscscan.com/address/0xb6896133126a103967b39eB7fd1fe0467583fDA3" target='_blank'>{`${referralStats.vault.slice(0, 4)}...${referralStats.vault.slice(-5)}`}</a></h5>
                      
                      
                    </div>
                  </div>
                  </div>
                </div>
              </section>
            </>
          )}
          {( myPets.length<1) && (
          
          <section>
          <div className="container">
            <div className="cs-height_45 cs-height_lg_45"></div>
            <div className="cs-isotop cs-style1 cs-isotop_col_5 cs-has_gutter_30" style={{position: 'relative', height: '500`1px'}}>
              <div className="cs-grid_sizer"></div>
              <div className="cs-isotop_item fashion" style={{position: 'absolute', left: '0%', top: '0px'}}>
                <div className="cs-card cs-style4 cs-box_shadow cs-white_bg">
                {/* <span className="cs-card_like cs-primary_color">
                  <i className="fas fa-heart fa-fw"></i>
                  2.1K
                  </span> */}
                  <a href="explore-details.html" className="cs-card_thumb cs-zoom_effect">
                  <Image
                    src="/img/pets/435.png"
                    alt="Image"
                    className="cs-zoom_item"
                    width='200'
                    height='200'
                    onLoad={handleImageLoad}
                />
                  </a>
                  <div className="cs-card_info" style={{marginTop: '9px'}}>
                
                <h3 className="cs-card_title">#435</h3>
                <div className="cs-card_price">0x...</div>
                </div>
                </div>
              </div>
            </div>
          
          </div>
        </section>
          )}
          </>
        )}
            
            
            
            
            {(!address || myPets.length<1) && (
            <>
            <section className="cs-hero cs-style4 cs-bg cs-center">
            <div className="container-fluid">
                <div className="cs-hero_in">
                    <div className="cs-hero_in_left">
                    <div className="cs-hero_text">
                    <h1 className="cs-hero_title cs-white_color" style={{fontFamily: 'Comfortaa'}}>Magical, Mythical, Battle-ready Hyenas As Pets</h1>
                    <div className="cs-hero_subtitle cs-medium cs-white_color" style={{fontFamily: 'Comfortaa'}}>The 1st xFt generative collection with assets as attributes. Each pet is attached to a smart contract to hold its token attributes and other value assets.</div>
                        <div className="cs-hero_btns">
                        <a href="#" className="cs-hero_btn cs-style1 cs-color3" onClick={handleOpenSmartModal}><span>xFT&apos;s</span></a>
                        <a href="#" className="cs-hero_btn cs-style1 cs-color1" onClick={handleOpenAAAModal}><span>AAA</span></a>
                        </div>
                    </div>
                    </div>
                    
                    <div className="cs-hero_in_right">
                    <Carousel />
                    </div>
                
                </div>
                <div className="cs-height_95 cs-height_lg_70"></div>
                <div className='container'>
                    <div className="row">
                    <div className='col-lg-6'>
                        <div className='cs-faq'>
                        <div className="cs-section_heading cs-style3">
                        <h2 className="cs-section_title">Story</h2>
                        <div className="cs-section_seperator"></div>
                        </div>
                        <div className="cs-height_30 cs-height_lg_30"></div>
                        <div style={{fontFamily: 'Comfortaa', color:'white'}}>
                        Based on the real life Hyena men of Nigeria, this nft collection will be a first of its kind utilizing assets as attributes for battles.<br/><br/>
                        
                        As the real life story goes, handlers of these wild creatures drink a magic potion which prevents the wild animals in their care from harming them.<br/><br/>
                        
                        In this story, on one stormy day.. a pregnant Hyena mom drank some of the magic potion by accident.<br/><br/>
                        
                        After, as she roamed about.. she felt a rumble in her belly each time she looked at the other wild creatures and village scenery.
                        
                        When she gave birth, the handlers noticed her pups weren&apos;t like other Hyena pups, instead they had the features of other animals and nature. <br/><br/>Some had wings, some eagle talons, some loin&apos;s mane and some had magical features such as unicorn horn, magical tail, firey hair, lightning eyes, special chest plate armor and more.
                        
                        <br/><br/>Envious, another pregnant Hyena mom drank the magic potion and then she gave birth... to be cont...<br/><br/>
                        </div>
                        </div>
                    </div>
                    
                    <div className='col-lg-6'>
                        <div className='cs-faq'>
                        <div className="cs-section_heading cs-style3">
                            <h2 className="cs-section_title">Hyena Men Of Nigeria</h2>
                            <div className="cs-section_seperator"></div>
                            <div className="cs-height_30 cs-height_lg_30"></div>
                            
                            <div>
                            <div className="videoWrapper">
                            <iframe className="video"
                                    width="560"
                                    height="315"
                                    src="https://www.youtube.com/embed/8o2WCe9ZsV8"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen>
                            </iframe>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    </div>
                </div>
                
                </div>
            </section>

                <div className="container">
                <div className="cs-cta cs-style2 text-center cs-accent_bg">
                    <h2 className="cs-cta_title cs-white_color_8" style={{fontFamily: 'Comfortaa'}}>Referral Bonus!</h2>
                    <div className="cs-cta_subtitle cs-white_color_8" style={{fontFamily: 'Comfortaa'}}>Tell A Friend & Get 20% Of Their Mint Fee!</div>
                    <h2 className="cs-cta_title cs-white_color_8" style={{fontFamily: 'Comfortaa', lineHeight:'63px'}}><small>up to</small> $1,000 (<small>BNB</small>) Additional Bonus! <br/>1st To Refer 30 Friends/Followers</h2>
                    <div className="cs-cta_subtitle cs-white_color_8" style={{fontFamily: 'Comfortaa'}}>Bonus Paid In Real Time!</div>
                    <div className="cs-cta_subtitle cs-white_color_8 mt-1 pt-0" style={{fontFamily: 'Comfortaa', lineHeight:'44px'}}>20% of reffered mint price stored in referral vault<br/> winner gets vault balance</div>
                    <hr/>
                <div className="row mt-5">
                <div className="col-lg-6 offset-lg-3 text-center">
                    
                <h5 style={{fontFamily: 'Comfortaa'}}>Referral Goal: {referralStats.goal}</h5>
                        {address && (
                            <>
                            <h5 style={{fontFamily: 'Comfortaa'}}>Top Referrer: {`${referralStats.topTeller.slice(0, 4)}...${referralStats.topTeller.slice(-5)}`}</h5>
                            <h5 className="mt-3" style={{fontFamily: 'Comfortaa'}}>Top Referrer Total: {referralStats.topTellerCount}</h5><br/>                          
                            </>
                        
                        )}
                        {!address && (
                        <>
                            <h5 style={{fontFamily: 'Comfortaa'}}>Top Referrer: connect wallet to view</h5>
                            <h5 className="mt-3" style={{fontFamily: 'Comfortaa'}}>Top Referrer Total: connect to view</h5><br/>                        
                        </>
                        
                        )}
                        
                        {/* <h5 style={{fontFamily: 'Comfortaa'}}>Vault: <a href="https://bscscan.com/address/0xb6896133126a103967b39eB7fd1fe0467583fDA3" target='_blank'>{`${referralStats.vault.slice(0, 4)}...${referralStats.vault.slice(-5)}`}</a></h5> */}
                    
                    
                </div>
                </div>
                </div>
                </div>
                <div className="cs-height_70 cs-height_lg_70"></div>
                        {(!address || myPets.length<1) && (
                        <section>
                        <div className="container">
                            <h2 className="cs-section_heading cs-style1 text-center" style={{color:'white'}}>Your Pet Is Waiting</h2>
                            <div className="cs-height_45 cs-height_lg_45"></div>
                                {address && (
                                            <div className="row">
                                            {images}
                                        </div>
                                )}
                            {!address && (
                            <div className="container">
                                    <div className="cs-cta cs-style2 text-center cs-accent_bg">
                                    <h3 className="cs-cta_title cs-white_color_8" style={{fontFamily: 'Comfortaa'}}>connect wallet to view some Hyena Pets</h3>
                                    <p className="text-center" style={{fontFamily: 'Comfortaa',color:'white'}}>if you are on mobile, its best to use the browser in your metamask app</p>
                                </div>
                            </div>
                                )}
                            
                        </div>
                    </section>
                    )}
                </>
            )}

            <div className="cs-height_95 cs-height_lg_70"></div>
            <div className='container'>
            <div className="row">
              <div className='col-lg-6'>
                <div className='cs-faq'>
                <div className="cs-section_heading cs-style3">
                  <h2 className="cs-section_title" style={{color:'white'}}>Tell A Friend</h2>
                  <div className="cs-section_seperator"></div>
                </div>
                <div className="cs-height_30 cs-height_lg_30"></div>
                  <div style={{fontFamily: 'Comfortaa',color:'white'}}>
                    <p>Run & Tell Your Friends! Share on social media! <br/><br/>You&apos;ll earn 20% of the mint fee for every friend you tell. Tell as many as you can!<br/></p>
                    <p>friends added:</p>
                    <ul>
                      
                    {friendAddresses.map((address:any, index:any) => (
                      <li key={index}>{address}</li>
                    ))}
                  </ul>
                  </div>
                </div>
              </div>
            
              <div className='col-lg-6'>
                <div className='cs-faq'>
                  <div className="cs-section_heading cs-style3">
                    <h2 className="cs-section_title" style={{color:'white'}}>Enter Friend 0x Addresses</h2>
                    <div className="cs-section_seperator"></div>
                    <div className="cs-height_30 cs-height_lg_30"></div>
                    
                    <div>
                    <div>
                    <form onSubmit={handleTellFriend}>.            
                    <div className="cs-bid_input_group2 text-center">
                        <input type="text" className="cs-bid_value" placeholder="0x address"  value={currentFriendAddress} onChange={handleAddressChange}required/>
                    </div>
                    <div className="cs-height_30 cs-height_lg_30"></div>
                    
                    <button onClick={handleAddAddress} className="cs-btn cs-style1 cs-btn_lg w-50"><span>Add Another</span></button>
                    <button type="submit" className="cs-btn cs-style1 cs-btn_lg w-50"><span>Submit</span></button>
                    
                    </form>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            
            </div>
          </div> 
          <div className="cs-height_95 cs-height_lg_70"></div>
          {isSmartModalOpen &&  
            <Modal onClose={handleCloseSmartModal} title="What's an XFt?">
              <div className="cs-single_post">
                <p style={{color:'black'}}>An xFt is an NFT that has a vault. <br/><br/>
                    By linking your Pet to a vault, you allow your pet to store assets including other NFTs.<br/><br/>
                    The owner of the pet is the only one who can access it&apos;s vault. <br/><br/>
                </p>
                <h4 className="text-center" style={{fontFamily: 'Comfortaa'}}>Beneftis of xFt&apos;s</h4>
                <ul style={{color:'black'}}>
                  <li>Store wrapped BTC, wrapped ETH, BNB and other assets in your xFt to guarantee real value.</li>
                  <li>Your xFt can never go to $0 since you can always add real value to its &apos;vault&apos;.</li>
                  <li>Lock assets in it&apos;s vault for a fixed period of time. (ie: 1 year or 2 months)</li>
                  <li>Use your xFt as collateral for loans.</li>
                  <li>Easily transfer a basket of assets, with the transfer of your xFt.</li>
                  <li>Enhanced collector/buyer incentives.</li>
                </ul>
              </div>
            
            </Modal>
        
        }
                {isAAAModalOpen &&  
            <Modal onClose={handleCloseAAAModal} title="Assets As Attributes?">
                          <div className="cs-single_post">
                <p style={{color:'black'}}>We are proud to be the 1st collection to offer Assets As Attributes. This is what makes your Pet battle-able, (pokemon style).
                  <br/><br/>Rather than static attributes like Speed: 100, Power: 400, Defense: 1,000 etc, Your Hyena Pet&apos;s attributes are tradeable tokens.<br/><br/>
                  Attribute tokens will be available for trade soon on pancakeswap.<br/><br/>
                </p>
                <h4 className="text-center" style={{fontFamily: 'Comfortaa'}}>Attributes</h4>
                <ul style={{color:'black'}}>
                  <li>SPEED: 10,000,000 supply</li>
                  <li>POWER: 50,000,000 supply</li>
                  <li>DEFENSE: 5,000,000 supply</li>
                  <li>FLIGHT: 1,000,000 supply</li>
                  <li>ATTACK: 12,000,000 supply</li>
                  <li>COUNTER ATTACK: 500,000 supply</li>
                  <li>MAGIC: 300,000 supply</li>
                </ul>
              </div>
            </Modal>
        
        }
        {isNoPetsModalOpen &&  
            <Modal onClose={handleCloseNoPetsModal} title="You Have No Pets">
              <div className="cs-single_post">
                <p className='text-cetnter' style={{color:'black'}}>You haven&apos;t minted any pets, mint one to get started
                </p>

              </div>
            </Modal>
        
        }
        </>
    
    
    )
}
export default Start;
