import React, {useEffect, useState} from 'react'
import styles from "@/styles/Home.module.css";
import Link from 'next/link'

const Footer = () => {
    
    return(
        <>
        <div className="cs-height_100 cs-height_lg_70"></div>
        <footer className="cs-footer cs-style1">
            <div className="cs-footer_bg"></div>
            <div className="cs-height_100 cs-height_lg_60"></div>
            <div className="container">
                <div className="text-center">
                    <p className="cs-page_title" style={{fontFamily: 'Comfortaa',color:'white'}}><small>created by</small> </p>
                    <h1 className="cs-page_title" style={{fontFamily: 'Comfortaa', color:'white'}}>xFT.red</h1>
                </div>
            </div>
            <div className="cs-height_60 cs-height_lg_20"></div>
            <div className="cs-footer_bottom">
            <div className="container">
            <div className="cs-footer_separetor"></div>
            <div className="cs-footer_bottom_in">
            <div className="cs-copyright">Copyright 2022 African Hyena Pets</div>
            <ul className="cs-footer_menu">
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Term &amp; Condition</Link></li>
            </ul>
            </div>
            </div>
            </div>
        </footer>
        </>
    )
}
export default Footer;