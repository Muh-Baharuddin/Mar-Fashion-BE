import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const NotaPembelianTable = ({ purchaseOrders }) => (
  <Table striped bordered hover className='text-center'>
    <thead>
      <tr>
        <th>Employee ID</th>
        <th>Name</th>
        <th>Phone Number</th>
        <th>Address</th>
        <th>action</th>
      </tr>
    </thead>
    <tbody>
      {purchaseOrders.map((purchaseOrder) => (
        <tr key={purchaseOrder.id}>
          <td>{purchaseOrder.id}</td>
          <td>{purchaseOrder.name}</td>
          <td>{purchaseOrder.phone}</td>
          <td>{purchaseOrder.address}</td>
          <td>
            <Button className='mx-4' variant="primary">Update</Button>
            <Button variant="danger">Delete</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default NotaPembelianTable;