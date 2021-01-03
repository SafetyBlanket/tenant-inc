import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Button, Card, Container, Divider, List, ListItem, TextField } from '@material-ui/core';
import { access } from 'fs';

interface Customer {
  id?: number;
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number?: string;
}

function App() {

  const [newCustomer, setNewCustomer] = useState({first_name: '', last_name: '', email_address: '', phone_number: ''} as Customer);
  const [customers, setCustomers] = useState([] as Array<Customer>);
  const [canSubmit, setCanSubmit] = useState(false);
  const [formErr, setFormErr] = useState('');
  const [accessToken, setAccessToken] = useState(null);

  // Get customers
  useEffect(() => {
    console.debug('Getting Customers...');
    getCustomers();
  }, []);

  useEffect(() => {
    const firstNameTest = () => !!newCustomer.first_name;
    const lastNameTest = () => !!newCustomer.last_name;
    const emailTest = () => !!newCustomer.email_address;
    const tests: Array<any> = [firstNameTest, lastNameTest, emailTest];
    const isValid: boolean = tests
      .map(test => test())
      .reduce((prev, cur) => prev && cur);
    setCanSubmit(isValid);
  }, [newCustomer]);

  const login = async () => {
    fetch(`http://localhost:3000/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'tenant',
        password: 'tenant123'
      })
    })
    .then(response => response.json())
    .then(data => setAccessToken(data.accessToken))
    .catch(err => console.error('There was a problem logging in', err));
  }

  const getCustomers = async () => {
    return await fetch(`http://localhost:3000/customers`)
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error(error));
  }

  const addCustomer = () => {
    console.debug('Adding Customer');
    fetch(`http://localhost:3000/customers`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken ? `Bearer ${accessToken}` : ''
      },
      body: JSON.stringify(newCustomer)
    })
    .then(response => {
      getCustomers();
      setNewCustomer({first_name: '', last_name: '', email_address: '', phone_number: ''})
    })
    .catch(error => setFormErr('There was a problem adding customer!'));
  }

  return (
    <div className="App">
      <Container maxWidth="sm">
        <Card>
          <Button variant="contained" color="primary" onClick={login}>
            Authenticate user as Admin
          </Button>
        </Card>
      </Container>
      <Container maxWidth="sm">
      <Card className="customer-form">
        <form action="" className="customer-form">
          <h3>Create new Customer</h3>
          {formErr && <h6>{formErr}</h6>}
          {!accessToken && <h6>Click the authenticate button to get a token</h6>}
          {/* First Name */}
          <TextField id="form-first-name" 
            label="First Name"
            variant="outlined"
            value={newCustomer.first_name}
            onChange={event => setNewCustomer({...newCustomer, first_name: event.target.value})} />
          
          {/* Last Name */}
          <TextField id="form-last-name"
            label="Last Name"
            variant="outlined"
            value={newCustomer.last_name} 
            onChange={event => setNewCustomer({...newCustomer, last_name: event.target.value})} />
          
          {/* Email */}
          <TextField id="form-email"
            label="Email"
            variant="outlined"
            type="email"
            value={newCustomer.email_address}
            onChange={event => setNewCustomer({...newCustomer, email_address: event.target.value})} />
          
          {/* Phone Number */}
          <TextField id="form-phone"
            label="Phone Number"
            variant="outlined"
            type="phone"
            value={newCustomer.phone_number}
            onChange={event => setNewCustomer({...newCustomer, phone_number: event.target.value})} />
          
          {/* Submit */}
          <Button variant="contained" disabled={!canSubmit} onClick={addCustomer}>Submit</Button>
        </form>
      </Card>
      <List>
        {customers && customers.map(customer => (
          <>
            <Card className="hover">
              <ListItem key={`li-${customer.id}`}>
                Name: {customer.last_name}, {customer.first_name}<br />
                Email: {customer.email_address} <br />
                Phone: {customer.phone_number}
              </ListItem>
            </Card>
            <Divider />
          </>
        ))}
      </List>
      </Container>
    </div>
  );
}

export default App;
