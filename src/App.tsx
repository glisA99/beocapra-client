import React from 'react';
import './App.css';
import { LoginForm } from './components/LoginForm';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginForm />}/>
        <Route path="/login" element={<>INDEX</>}/>
      </Routes>
    </div>
  );
}

export default App;
