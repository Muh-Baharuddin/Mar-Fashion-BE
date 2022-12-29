import TableBaju from "../../components/TableBaju";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const Baju = () => {
  const shirt = [
    { id: 1, name: 'John Smith', phone: '555-555-1212', address: '123 Main St' },
    { id: 2, name: 'Jane Doe', phone: '555-555-1212', address: '456 Market St' },
    // ... more employees
  ];

  return (
    <div>
      <NavBar />
      <h1>Nota Pembelian</h1>
      <TableBaju shirts={shirt} />
      <Footer />
    </div>
  );
};

export default Baju;