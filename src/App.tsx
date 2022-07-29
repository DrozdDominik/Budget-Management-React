import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { MainPage } from './components/MainPage/MainPage';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import { LoginForm } from './components/LoginForm/LoginForm';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

export default App;
