import Image from "next/image";
import dynamic from 'next/dynamic'
import Layout from '../components/Layout';
// const Start = dynamic(() => import("../components/Start"));
const LoadingComponent = () => {
	return (
	  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
		<Image src="/img/loading.gif" alt="Loading..." width={100} height={100} />
	  </div>
	);
  };
const Start = dynamic(() => import('../components/Start'), {
	loading: LoadingComponent
  });
  const Home = () => {
	return (
	  <Layout>
		<Start />
	  </Layout>
	);
  };
  
  export default Home;
