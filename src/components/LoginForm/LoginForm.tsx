import React, { SyntheticEvent, useState } from 'react';
import { Btn } from '../common/Btn';
import { apiUrl } from '../../config/api';
import { UserLoginResponse } from 'types';

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [status, setStatus] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const updateForm = (key: string, value: any) => {
    setForm(form => ({
      ...form,
      [key]: value,
    }));
  };

  const loginUser = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);
    setErr(false);

    try {
      const res = await fetch(`${apiUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.status === 401) {
        setErr(true);
      }

      const data: UserLoginResponse = await res.json();

      setStatus(data.ok);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Trwa logowanie...</h2>;
  }

  if (status) {
    return (
      <div>
        <h2>Udane logowanie!</h2>
        <Btn text="Panel wydatków" to="/" />
      </div>
    );
  }

  return (
    <>
      <h1>Formularz logowania</h1>
      <form onSubmit={loginUser}>
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
            Hasło:
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={e => updateForm('password', e.target.value)}
            />
          </label>
        </p>
        <Btn text="Zaloguj!" />
      </form>
      {err && <h3>Podano niepoprawne dane logowania!</h3>}
      <Btn text="Powrót do strony głównej" to="/" />
    </>
  );
};
