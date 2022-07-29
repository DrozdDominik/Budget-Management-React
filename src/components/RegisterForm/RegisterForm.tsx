import React, { SyntheticEvent } from 'react';
import { apiUrl } from '../../config/api';
import { useState } from 'react';
import { Btn } from '../common/Btn';
import { UserRegisterResponse } from 'types';

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    family: '',
    password: '',
  });

  const updateForm = (key: string, value: any) => {
    setForm(form => ({
      ...form,
      [key]: value,
    }));
  };

  const registerUser = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data: UserRegisterResponse = await res.json();

      setId(data.id);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Trwa rejestracja...</h2>;
  }

  if (id) {
    return (
      <div>
        <h2>Udana rejestracja! Możesz się zalogować.</h2>
        <Btn text="Logowanie" to="/login" />
      </div>
    );
  }

  return (
    <>
      <form onSubmit={registerUser}>
        <h1>Rejestracja użytkownika</h1>
        <p>
          <label>
            Imię:
            <input
              type="text"
              name="name"
              required
              minLength={2}
              maxLength={30}
              value={form.name}
              onChange={e => updateForm('name', e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Email:
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={e => updateForm('email', e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Rodzina:
            <input
              type="text"
              name="family"
              required
              minLength={3}
              maxLength={50}
              value={form.family}
              onChange={e => updateForm('family', e.target.value)}
            />
          </label>
        </p>
        <p>
          <label>
            Hasło:
            <input
              type="password"
              name="password"
              required
              minLength={7}
              maxLength={15}
              value={form.password}
              onChange={e => updateForm('password', e.target.value)}
            />
          </label>
        </p>
        <Btn text="Zarejestruj!" />
      </form>
      <Btn text="Powrót do strony głównej" to="/" />
    </>
  );
};
