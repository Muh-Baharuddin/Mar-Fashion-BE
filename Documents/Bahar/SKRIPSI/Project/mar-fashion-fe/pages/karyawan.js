import EmployeeTable from "../components/EmployeeTable";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const EmployeesPage = () => {
  const employees = [
    { id: 1, name: 'John Smith', phone: '555-555-1212', address: '123 Main St' },
    { id: 2, name: 'Jane Doe', phone: '555-555-1212', address: '456 Market St' },
    // ... more employees
  ];

  return (
    <div>
      <NavBar />
      <h1>Employees</h1>
      <EmployeeTable employees={employees} />
      <Footer />
    </div>
  );
};

export default EmployeesPage;