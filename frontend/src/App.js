import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddCustomer from './compenents/AddCustomer';
import CustomerList from './compenents/CustomerList';
import UpdateCustomer from './compenents/UpdateCustomer';



export function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddCustomer/>} />
          <Route path="/list" element={<CustomerList/>}/>
          <Route path="/edit/:id" element={<UpdateCustomer/>}/>

        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
