import Head from 'next/head';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';
import MainContent from '../components/MainContent';


export default function Home() {
  return (
    <main className="d-flex flex-column min-vh-100">
      <Head>
        <title>Mar Fashion</title>
        <meta name="Website Mar Fashion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Carousel />
      <MainContent />
      <Footer />
    </main>
  );
}