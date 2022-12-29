import 'bootstrap/dist/css/bootstrap.min.css';
// import Layout from '../components/Home/Layout';
import '../styles/globals.css'

export default function MyApp({Component, pageProps}) {
  return (
    // <Layout>
      <Component {...pageProps} />
    // </Layout>
  )
}