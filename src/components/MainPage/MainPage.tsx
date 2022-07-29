import React from 'react';
import { Link } from 'react-router-dom';

export const MainPage = () => {
  return (
    <>
      <h1>Witamy w aplikacji zarządzania wydatkami rodziny</h1>
      <div>
        <Link to="/register">Rejestracja </Link>
      </div>
      <div>
        <Link to="/login">Logowanie </Link>
      </div>
    </>
  );
};
