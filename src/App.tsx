import React from 'react';
import './App.css';
import { LoginForm } from './components/LoginForm';
import { Route, Routes } from 'react-router-dom';
import { AuthorizedRouteProxy } from './components/AuthorizedRouteProxy';
import { LoginRouteProxy } from './components/LoginRouteProxy';
import { Navbar } from './components/Navbar';
import { ProductsPage } from './components/ProductsPage';
import { SearchProducts } from './components/SearchProducts';
import { CreateReceiptPage } from './components/CreateReceiptPage';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <AuthorizedRouteProxy path='/login'>
            <Navbar />
            <>INDEX</>
          </AuthorizedRouteProxy>
        }/>
        <Route path="/login" element={
          <LoginRouteProxy>
            <div className='wrapper-index-container'>
              <LoginForm />
            </div>
          </LoginRouteProxy>
        }/>
        <Route path="/products" element={
          <React.Fragment>
            <Navbar />
            <ProductsPage />
          </React.Fragment> 
        }/>
        <Route path="/products/search" element={
          <AuthorizedRouteProxy path='/login'>
            <Navbar />
            <SearchProducts />
          </AuthorizedRouteProxy>
        }/>
        <Route path="/receipt/create" element={
          <AuthorizedRouteProxy path="/login">
            <Navbar />
            <CreateReceiptPage />
          </AuthorizedRouteProxy>
        } />
      </Routes>
    </div>
  );
}

export default App;
