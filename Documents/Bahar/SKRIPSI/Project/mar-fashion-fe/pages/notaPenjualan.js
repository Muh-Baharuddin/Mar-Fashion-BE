import NotaPenjualanTable from "../components/NotaPenjualanTable";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const NotaPenjualan = () => {
  const sellNote = [
    { id: 1, name: 'John Smith', phone: '555-555-1212', address: '123 Main St' },
    { id: 2, name: 'Jane Doe', phone: '555-555-1212', address: '456 Market St' },
    // ... more employees
  ];

  return (
    <div>
      <NavBar />
      <h1>Nota Penjualan</h1>
      <NotaPenjualanTable sellNotes={sellNote} />
      <Footer />
    </div>
  );
};

export default NotaPenjualan;