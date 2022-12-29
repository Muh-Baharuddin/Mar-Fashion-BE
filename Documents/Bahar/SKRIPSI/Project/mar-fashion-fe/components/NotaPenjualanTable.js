import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const NotaPenjualanTable = ({ sellNotes }) => (
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
      {sellNotes.map((sellNote) => (
        <tr key={sellNote.id}>
          <td>{sellNote.id}</td>
          <td>{sellNote.name}</td>
          <td>{sellNote.phone}</td>
          <td>{sellNote.address}</td>
          <td>
            <Button className='mx-4' variant="primary">Update</Button>
            <Button variant="danger">Delete</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default NotaPenjualanTable;