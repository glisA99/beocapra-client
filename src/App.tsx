import React from 'react';
import './App.css';
import { LoginForm } from './components/LoginForm';
import { Route, Routes } from 'react-router-dom';
import { AuthorizedRouteProxy } from './components/AuthorizedRouteProxy';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <AuthorizedRouteProxy path=''>
            <>INDEX</>
          </AuthorizedRouteProxy>
        }/>
        <Route path="/login" element={<>INDEX</>}/>
      </Routes>
    </div>
  );
}

export default App;
