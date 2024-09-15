import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from "react-slick";
// import { ethers, parseUnits } from 'ethers'; // Proper import of ethers utilities
import { useAccount,useContractRead } from 'wagmi'
import Modal from './Modal';
import { useMintTo } from '../hooks/useMintTo';
import { useMintPrice } from '../hooks/useMintPrice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const { address, isConnecting, isDisconnected } = useAccount()
    const [isMintModalOpen, setIsMintModalOpen] = useState(false);
    const [gas, setGas]:any = useState(0);
    const [quantity, setQuantity]:any = useState(1);
    const { mintPrice, isLoading: isPriceLoading, isError: isPriceError }:any = useMintPrice();
    const { mintTokens, isLoading: isMintLoading, isSuccess, error } = useMintTo(quantity, mintPrice,address);
    const isLoading = isPriceLoading || isMintLoading;
    const isDisabled = isLoading || !mintPrice || mintPrice <= 0;
    
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
    
    const handleImageLoad = (event:any) => {
        // Your custom logic for image load event
       // console.log('Image loaded:', event.target);
      };
      function handleOpenMintModal() {
        setIsMintModalOpen(true);
      }
      
      function handleCloseMintModal() {
        setIsMintModalOpen(false);
      }
    const settings = {
        centerMode: true,
        infinite: true,
        centerPadding: '120px',
        slidesToShow: 2,
        speed: 500,
        responsive: [
          {
            breakpoint: 320, // Adjust this value based on your design
            settings: {
              slidesToShow: 1,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            },
          },
          {
              breakpoint: 375, // Adjust this value based on your design
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              },
            },
            {
              breakpoint: 414, // Adjust this value based on your design
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              },
            },
          {
              breakpoint: 480, // Adjust this value based on your design
              settings: {
                slidesToShow: 1,
              },
            },
          {
              breakpoint: 768, // Adjust this value based on your design
              settings: {
                slidesToShow: 1,
              },
            },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
            },
          },
        ],
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
      };

      const slides = [
        {
          id: 1,
          content: (
            <div className="cs-card cs-style4 cs-box_shadow cs-white_bg" style={{ width: 300 }}>
              <span className="cs-card_like cs-primary_color">
              <i className="fab fa-bolt"><small>SPEED:</small></i>
                  3K
                  </span>
                  <a href="explore-details.html" className="cs-card_thumb cs-zoom_effect">
                  <Image
                      src="/img/pets/76.png"
                      alt="Image"
                      className="cs-zoom_item"
                      width='600'
                      height='600'
                      onLoad={handleImageLoad}
                  />
                  </a>
                  <div className="cs-card_info" style={{marginTop: '9px'}}>
                  
                  <h3 className="cs-card_title"><a href="explore-details.html">Hyena Pets</a></h3>
                  <div className="cs-card_price">#: <b className="cs-primary_color">76</b></div>
                  <hr/>
                  <div className="cs-card_footer">
                      <span className="cs-card_btn_1" data-modal="#history_1">
                      <i className="fab fa-btc"></i>
                      0.082 BNB
                      </span>
                      <span className="cs-card_btn_2" onClick={handleOpenMintModal}><span>Mint Yours</span></span>
                  </div>
                  </div>
          </div>
          ),
        },
        {
          id: 2,
          content: (
              <div className="cs-card cs-style4 cs-box_shadow cs-white_bg" style={{ width: 300 }}>
                  <span className="cs-card_like cs-primary_color">
                  <i className="fab fa-bolt"><small>POWER:</small></i>
                      15K
                      </span>
                      <a href="explore-details.html" className="cs-card_thumb cs-zoom_effect">
                      <Image
                          src="/img/pets/28.png"
                          alt="Image"
                          className="cs-zoom_item"
                          width='200'
                          height='200'
                          onLoad={handleImageLoad}
                      />
                      </a>
                      <div className="cs-card_info" style={{marginTop: '9px'}}>
                      <h3 className="cs-card_title"><a href="explore-details.html">Hyena Pets</a></h3>
                      <div className="cs-card_price">#: <b className="cs-primary_color">28</b></div>
                      <hr/>
                      <div className="cs-card_footer">
                          <span className="cs-card_btn_1" data-modal="#history_1">
                          <i className="fab fa-btc"></i>
                          0.082 BNB
                          </span>
                          <span className="cs-card_btn_2" onClick={handleOpenMintModal}><span>Mint Yours</span></span>
                      </div>
                      </div>
              </div>
          ),
        },
        {
          id: 3,
          content: (
              <div className="cs-card cs-style4 cs-box_shadow cs-white_bg" style={{ width: 300 }}>
              <span className="cs-card_like cs-primary_color">
              <i className="fab fa-bolt"><small>FLIGHT:</small></i>
                  30K
                  </span>
                  <a href="explore-details.html" className="cs-card_thumb cs-zoom_effect">
                  <Image
                      src="/img/pets/107.png"
                      alt="Image"
                      className="cs-zoom_item"
                      width='200'
                      height='200'
                      onLoad={handleImageLoad}
                  />
                  </a>
                  <div className="cs-card_info" style={{marginTop: '9px'}}>
                  
                  <h3 className="cs-card_title"><a href="explore-details.html">Hyena Pets</a></h3>
                  <div className="cs-card_price">#: <b className="cs-primary_color">107</b></div>
                  <hr/>
                  <div className="cs-card_footer">
                      <span className="cs-card_btn_1" data-modal="#history_1">
                      <i className="fab fa-btc"></i>
                      0.082 BNB
                      </span>
                      <span className="cs-card_btn_2" onClick={handleOpenMintModal}><span>Mint Yours</span></span>
                  </div>
                  </div>
          </div>
          ),
        },
        {
          id: 4,
          content: (
              <div className="cs-card cs-style4 cs-box_shadow cs-white_bg" style={{ width: 300 }}>
              <span className="cs-card_like cs-primary_color">
              <i className="fab fa-bolt"><small>ATTACK:</small></i>
                  35K
                  </span>
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
                  
                  <h3 className="cs-card_title"><a href="explore-details.html">Hyena Pets</a></h3>
                  <div className="cs-card_price">#: <b className="cs-primary_color">435</b></div>
                  <hr/>
                  <div className="cs-card_footer">
                      <span className="cs-card_btn_1" data-modal="#history_1">
                      <i className="fab fa-btc"></i>
                      0.082 BNB
                      </span>
                      <span className="cs-card_btn_2" onClick={handleOpenMintModal}><span>Mint Yours</span></span>
                  </div>
                  </div>
          </div>
          ),
        },
      ];

      return(
        <>
        <Slider {...settings}>
            {slides.map((slide) => (
            <div key={slide.id} className="slick-slide">
                {slide.content}
            </div>
            ))}
        </Slider> 
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
const CustomPrevArrow = (props:any) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        {/* Your custom previous arrow content */}
        &lt;
      </div>
    );
  };
  
  const CustomNextArrow = (props:any) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        {/* Your custom next arrow content */}
        &gt;
      </div>
    );
  };
  export default Carousel;