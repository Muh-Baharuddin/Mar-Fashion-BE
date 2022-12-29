import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const TableBaju = ({ shirts }) => (
  <Table striped bordered hover className='text-center'>
    <thead>
      <tr>
        <th>ID Baju</th>
        <th>Name</th>
        <th>Phone Number</th>
        <th>Address</th>
        <th>action</th>
      </tr>
    </thead>
    <tbody>
      {shirts.map((shirt) => (
        <tr key={shirt.id}>
          <td>{shirt.id}</td>
          <td>{shirt.name}</td>
          <td>{shirt.phone}</td>
          <td>{shirt.address}</td>
          <td>
            <Button className='mx-4' variant="primary">Update</Button>
            <Button variant="danger">Delete</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default TableBaju;