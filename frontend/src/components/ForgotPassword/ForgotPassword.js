import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/actions/users/userActions";
import { Container, Box, Typography, TextField, Button, CircularProgress } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  
  const { forgotPasswordLoading, forgotPasswordSuccess,forgotPasswordMessage, error } = useSelector(
    (state) => state.user // Ensure 'user' matches the key in combineReducers
  );
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 3, borderRadius: 2, boxShadow: 3, bgcolor: "white" }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Forgot Password
        </Typography>
        <Typography align="center" sx={{ mb: 2 }}>
          Enter your email to receive a password reset link.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }} disabled={forgotPasswordLoading}>
            {forgotPasswordLoading ? <CircularProgress size={24} /> : "Send Reset Link"}
          </Button>
        </form>
        {forgotPasswordSuccess && <Typography align="center" sx={{ mt: 2, color: "green" }}>{forgotPasswordSuccess}</Typography>}
        {error && <Typography align="center" sx={{ mt: 2, color: "red" }}>{error}</Typography>}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
