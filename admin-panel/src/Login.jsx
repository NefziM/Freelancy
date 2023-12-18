import React, { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const theme = createTheme();

const LoginPage = ({ theme }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the login function with the provided credentials
    login({ username, password })
      .then(() => {
        // Login successful
        notify('Logged in successfully');
      })
      .catch(() => {
        // Login failed
        notify('Invalid credentials');
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" color="primary" variant="contained">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <Notification />
    </ThemeProvider>
  );
};

export default LoginPage;
