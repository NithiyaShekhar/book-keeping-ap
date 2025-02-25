import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/users/userActions";
import ErrorMessage from "../DisplayMessage/ErrorMessage";
import Loading from "../Loading/Loading";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,FormControlLabel,
  Checkbox,Divider
} from "@mui/material";
import { Google, LinkedIn } from "@mui/icons-material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLoginDetails = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLoginDetails;

  useEffect(() => {
    if (userInfo) {
      navigate("/"); // Redirect to home after login
    }
  }, [userInfo, navigate]);

  const submitFormHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password, rememberMe));
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 3, borderRadius: 2, boxShadow: 3, bgcolor: "white" }}>
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          Login
        </Typography>
        {loading && <Loading />}
        {error && <ErrorMessage error={error} />}
        <form onSubmit={submitFormHandler}>
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
          <FormControlLabel
            control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
            label="Remember me"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2, bgcolor: "primary.main" }}
          >
            Login
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 1 }}>
          <Link to="/forgot-password" style={{ color: "#1976d2", textDecoration: "none", cursor: "pointer" }}>
            Forgot your password?
          </Link>
        </Typography>
        <Divider sx={{ my: 2 }}>or</Divider>
        <Button
          fullWidth
          variant="outlined"
          startIcon={
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Google_2015_logo.svg"
              alt="Google"
              style={{ width: 20, height: 20 }}
            />
          }
          sx={{ mb: 1, textTransform: "none" }}
        >
          Sign in with Google
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<LinkedIn sx={{ color: "#0077B5" }} />}
          sx={{ mb: 1, textTransform: "none" }}
        >
          Sign in with LinkedIn
        </Button>
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link to="/register" style={{ color: "#1976d2", textDecoration: "none", cursor: "pointer" }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
