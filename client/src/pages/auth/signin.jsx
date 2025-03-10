import * as React from 'react';
import { useMutation, gql } from '@apollo/client';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// Define GraphQL mutation
const SIGNIN = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        uid
        username
      }
    }
  }
`;

// Authentication Component
export default function CredentialsSignInPage() {
  const theme = useTheme();
  const [loginUser, { loading, error, data }] = useMutation(SIGNIN);
  const navigate = useNavigate();

  // Function to handle sign-in
  const signIn = async (provider, formData) => {
    console.log(provider, formData)
    try {
      const { data } = await loginUser({
        variables: {
          username: formData.get('email'), // ✅ Fetching "username" instead of "email"
          password: formData.get('password'),
        },

        
      });
      navigate('dashboard')
      console.log('data', data);
      console.log('formData', formData);

      alert(`Login Successful! Token: ${data.loginUser.user.username}`);
    } catch (err) {
      console.log(err)
      const networkErr = err.message.split(' ')[0];
      if(networkErr == 'getaddrinfo') return alert(`Login Failed: Check you internet connection`)

      alert(`Login Failed: ${err.message}`);
    }
  };

  return (
    <Box
      sx={{
        background: `url("/signin-background.webp")`,
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute", 
        top: 0, 
        left: 0, 
        right: 0,
        bottom: 0
      }}
    >
      <SignInPage
        signIn={signIn}
        providers={[{ id: 'credentials', name: 'Username and Password' }]} // ✅ Updated provider name
        slotProps={{
          usernameField: { label: "Username", autoFocus: true }, // ✅ Updated label
          form: { noValidate: true },
        }}
      />
    </Box>
  );
}
