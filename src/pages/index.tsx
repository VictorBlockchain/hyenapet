import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import type { GetServerSideProps, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useState } from "react";
import Layout from '../components/Layout';
const Start = dynamic(() => import("../components/Start"));

export default function Home() {

	return (
		<>
			<Layout >
				<Start   />
			</Layout>		
		</>
	
	);
}
