import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/actions/users/userActions";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister) || {};
  const { userInfo, loading, error } = userRegister;
  console.log(userRegister);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
    if (userInfo) {
      navigate("/");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 3, borderRadius: 2, boxShadow: 3, bgcolor: "white" }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Sign Up
        </Typography>
        {loading && <CircularProgress sx={{ display: "block", mx: "auto" }} />}
        {error && <Alert severity="error">{error.message || "Something went wrong"}</Alert>}
        <form onSubmit={formSubmitHandler}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2, bgcolor: "primary.main" }}
          >
            Register
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#1976d2", textDecoration: "none", cursor: "pointer" }}>
            Sign in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
