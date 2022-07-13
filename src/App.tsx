import React from 'react';
import './App.css';
import { LoginForm } from './components/LoginForm';
import { Route, Routes } from 'react-router-dom';
import { AuthorizedRouteProxy } from './components/AuthorizedRouteProxy';
import { LoginRouteProxy } from './components/LoginRouteProxy';
import { Navbar } from './components/Navbar';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <AuthorizedRouteProxy path='/login'>
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
          </React.Fragment> 
        }/>
      </Routes>
    </div>
  );
}

export default App;
