import SupplierTable from "../components/SupplierTable";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Supplier = () => {
  const supplier = [
    { id: 1, name: 'John Smith', phone: '555-555-1212', address: '123 Main St' },
    { id: 2, name: 'Jane Doe', phone: '555-555-1212', address: '456 Market St' },
    // ... more employees
  ];

  return (
    <div>
      <NavBar />
      <h1>Suppliers</h1>
      <SupplierTable suppliers={supplier} />
      <Footer />
    </div>
  );
};

export default Supplier;