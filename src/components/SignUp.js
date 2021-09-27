import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { Button, TextField } from '@material-ui/core';

import { useAuth } from '../store/StateProvider';
import { REGISTER_USER } from '../graphql/mutations';
import './SignUp.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();
  const [, dispatch] = useAuth();

  const [signUpUser, { loading }] = useMutation(REGISTER_USER);

  const signIn = async (e) => {
    e.preventDefault();

    const { data } = await signUpUser({ variables: { name, email, password } });

    if (data.register.user) {
      const registerData = {
        email: data?.register.user.email,
        name: data?.register.user.name,
        token: data?.register.user.token
      };

      dispatch({
        type: 'REGISTER_SUCCESS',
        user: registerData
      });
      history.push('/');
    } else if (data.register.errors) {
      setError(data.register.errors[0].message);

      dispatch({
        type: 'REGISTER_FAIL'
      });
    }
  };

  return (
    <div className="signUp">
      <h2>Sign Up</h2>
      <form onSubmit={signIn} className="signUp__container">
        <TextField
          type="text"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          variant="outlined"
        />
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
        <p>{error}</p>
        <Button type="submit" disabled={loading}>
          Sign up
        </Button>
      </form>
      <p className="signUp__link">
        Already have account? <Link to="/">Sign In</Link>
      </p>
    </div>
  );
}

export default SignUp;
