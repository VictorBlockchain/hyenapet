import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";
import '../styles/style.css';
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import {
	arbitrum,
	avalanche,
	bsc,
	fantom,
	gnosis,
	mainnet,
	optimism,
	polygon,
} from "wagmi/chains";

const chains = [
	// mainnet,
	// polygon,
	// avalanche,
	// arbitrum,
	bsc,
	// optimism,
	// gnosis,
	// fantom,
];


const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const metadata = {
	name: "Hyena Pets",
	description: "Magical, Mythical, Battle Ready, Hyena's As Pets",
	url: "https://hyenapet.com",
	icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig:any = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

function MyApp({ Component, pageProps }: AppProps) {

	const [ready, setReady] = useState(false);
	
	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
		script.crossOrigin = 'anonymous';
		script.async = true;
		document.body.appendChild(script);
	  
		return () => {
		  document.body.removeChild(script);
		};
	  }, []);
	  
	useEffect(() => {
		setReady(true);
	}, []);
	return (
		<>
			{ready ? (
				<WagmiConfig config={wagmiConfig}>
					<Component {...pageProps} />
				</WagmiConfig>
			) : null}
		</>
	);
}
export async function getServerSideProps() {
	return {
	  props: {},
	};
  }
  export default MyApp

