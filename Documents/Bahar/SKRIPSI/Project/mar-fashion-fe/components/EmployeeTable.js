import React from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const EmployeeTable = ({ employees }) => (
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
      {employees.map((employee) => (
        <tr key={employee.id}>
          <td>{employee.id}</td>
          <td>{employee.name}</td>
          <td>{employee.phone}</td>
          <td>{employee.address}</td>
          <td>
            <Button className='mx-4' variant="primary">Update</Button>
            <Button variant="danger">Delete</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default EmployeeTable;