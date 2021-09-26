import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { Button, TextField } from '@material-ui/core';

import { useAuth } from '../store/StateProvider';
import { LOGIN_USER } from '../graphql/mutations';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const [, dispatch] = useAuth();

  const [logInUser, { loading, error }] = useMutation(LOGIN_USER);

  const signIn = async (e) => {
    e.preventDefault();

    const { data } = await logInUser({ variables: { email, password } });
    const loginData = {
      email: data?.login.email,
      name: data?.login.name,
      token: data?.login.token
    };
    dispatch({
      type: 'LOGIN_SUCCESS',
      user: loginData
    });
    history.push('/');
  };

  return (
    <div className="login">
      <h2>Sign In</h2>
      <form onSubmit={signIn} className="login__container">
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          variant="outlined"
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          variant="outlined"
        />
        <Button type="submit">Sign in</Button>
      </form>
      <p className="login__link">
        New User? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
