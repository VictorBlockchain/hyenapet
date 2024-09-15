import React, { Component } from 'react'
import { useRouter } from 'next/router';
import { useEffect,useState} from 'react'
import { useAccount } from 'wagmi'
import Link from 'next/link'

const CONTRACT_ADDRESS = '0xAF73c709e66fe339beE5608477F9e7A589acAEC5';
const contractABI = require('../abi/ahp.json');

const Nav = ({}) => {
    const router = useRouter();
    const {address, isConnecting, isDisconnected } = useAccount()
    const[showButtons, setShowButtons]:any = useState(false)
    const navbarCollapse:any = document.querySelector('.navbar-collapse');
    const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
        useState(false);
    const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const closeAll = () => {
        setIsNetworkSwitchHighlighted(false);
        setIsConnectHighlighted(false);
    };
    
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
    
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    const toggle = ()=>{
        if (showButtons) {
            setShowButtons(false)
          }else{
            setShowButtons(true)
          }
    }
    return(
        <>
            <header>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                    <Link className="navbar-brand p-2" href="/">
                        {/* If you have a logo, you can include it like this:
                        <img src="/path-to-your-logo.svg" alt="Logo" height="32" /> */}
                        <span className="animated-text">Hyena Pets</span>
                    </Link>
                    {address && (
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={toggle} style={{ border: '1px solid green' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#00ff00"> {/* Green color */}
                                <path d="M18 6h-2V3a1 1 0 00-2 0v3h-4V3a1 1 0 00-2 0v3H6a2 2 0 00-2 2v5c0 1.103.897 2 2 2h2v2h-.5c-.827 0-1.5.673-1.5 1.5V20c0 .827.673 1.5 1.5 1.5h11c.827 0 1.5-.673 1.5-1.5v-2.5c0-.827-.673-1.5-1.5-1.5H16v-2h2c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zm-1 7h-2v3h.5c.275 0 .5.225.5.5V20c0 .275-.225.5-.5.5h-11c-.275 0-.5-.225-.5-.5v-2.5c0-.275.225-.5.5-.5H10v-3H8V8h8v5z"/>
                            </svg>
                        </button>
                    )}
                    {!address && (
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={toggle} style={{ border: '1px solid red' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#ff0000"> {/* Red color */}
                                <path d="M18 6h-2V3a1 1 0 00-2 0v3h-4V3a1 1 0 00-2 0v3H6a2 2 0 00-2 2v5c0 1.103.897 2 2 2h2v2h-.5c-.827 0-1.5.673-1.5 1.5V20c0 .827.673 1.5 1.5 1.5h11c.827 0 1.5-.673 1.5-1.5v-2.5c0-.827-.673-1.5-1.5-1.5H16v-2h2c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2zm-1 7h-2v3h.5c.275 0 .5.225.5.5V20c0 .275-.225.5-.5.5h-11c-.275 0-.5-.225-.5-.5v-2.5c0-.275.225-.5.5-.5H10v-3H8V8h8v5z"/>
                            </svg>
                        </button>
                    )}
                    
                    
                    
                    <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto justify-content-center justify-content-lg-end">
                            {isMobile && showButtons && (
                                <>
                                    <li className="nav-item">
                                        <div onClick={closeAll} className={`nav-link ${isNetworkSwitchHighlighted ? 'highlightSelected' : ''}`}>
                                            <w3m-network-button />
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div onClick={closeAll} className={`nav-link ${isConnectHighlighted ? 'highlightSelected' : ''}`}>
                                            <w3m-button />
                                        </div>
                                    </li>                                
                                </>
                            )}
                            {!isMobile && (
                                <>
                                    <li className="nav-item">
                                        <div onClick={closeAll} className={`nav-link ${isNetworkSwitchHighlighted ? 'highlightSelected' : ''}`}>
                                            <w3m-network-button />
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <div onClick={closeAll} className={`nav-link ${isConnectHighlighted ? 'highlightSelected' : ''}`}>
                                            <w3m-button />
                                        </div>
                                    </li>                                
                                </>
                            )}
                            </ul>
                    </div>
                    
                    </div>
                </nav>
            </header>
        </>
    )
}
    export default Nav;