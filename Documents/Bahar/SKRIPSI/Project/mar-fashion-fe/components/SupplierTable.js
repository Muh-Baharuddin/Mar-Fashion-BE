import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const SupplierTable = ({ suppliers }) => (
  <Table striped bordered hover className='text-center'>
    <thead>
      <tr>
        <th>Supplier ID</th>
        <th>Name</th>
        <th>Phone Number</th>
        <th>Address</th>
        <th>action</th>
      </tr>
    </thead>
    <tbody>
      {suppliers.map((supplier) => (
        <tr key={supplier.id}>
          <td>{supplier.id}</td>
          <td>{supplier.name}</td>
          <td>{supplier.phone}</td>
          <td>{supplier.address}</td>
          <td>
            <Button className='mx-4' variant="primary">Update</Button>
            <Button variant="danger">Delete</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default SupplierTable;