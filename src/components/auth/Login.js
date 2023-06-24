import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import LoginHook from "../../hook/auth/LoginHook";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "../shared/LoadingSpinner";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formik, isLoading,isSignUp,setIsSignUp] = LoginHook();

  const { t } = useTranslation();

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        maxWidth={400}
        margin={"auto"}
        marginTop={2}
        padding={2}
        borderRadius={5}
        boxShadow={"5px 5px 10px #ccc"}
        sx={{ ":hover": { boxShadow: "10px 10px 20px #ccc" } }}
      >
      
        <Typography variant="h2" padding={1} textAlign={"center"}>
          { isSignUp? t("Sign Up"):t("Login")}
        </Typography>
        <TextField
          margin="normal"
          name="email"
          type="email"
          variant="outlined"
          label={t("email")}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          onBlur={formik.handleBlur}
          fullWidth
        />
        <TextField
          margin="normal"
          name="password"
          autoComplete={formik.values.password}
          type="password"
          variant="outlined"
          label={t("Password")}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          onBlur={formik.handleBlur}
          fullWidth
        />

    {
      isSignUp && (
        <>
        <TextField
        margin="normal"
        name="firstName"
        type="text"
        variant="outlined"
        label={t("firstName")}
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        onBlur={formik.handleBlur}
        fullWidth
      />
      <TextField
      margin="normal"
      name="lastName"
      type="text"
      variant="outlined"
      label={t("lastName")}
      value={formik.values.lastName}
      onChange={formik.handleChange}
      error={formik.touched.lastName && Boolean(formik.errors.lastName)}
      helperText={formik.touched.lastName && formik.errors.lastName}
      onBlur={formik.handleBlur}
      fullWidth
    />
    <TextField
    margin="normal"
    name="mobile"
    type="text"
    variant="outlined"
    label={t("phone Number")}
    value={formik.values.mobile}
    onChange={formik.handleChange}
    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
    helperText={formik.touched.mobile && formik.errors.mobile}
    onBlur={formik.handleBlur}
    fullWidth
  />

  <TextField
  margin="normal"
  name="national_id"
  type="text"
  variant="outlined"
  label={t("National Id")}
  value={formik.values.national_id}
  onChange={formik.handleChange}
  error={formik.touched.national_id && Boolean(formik.errors.national_id)}
  helperText={formik.touched.national_id && formik.errors.national_id}
  onBlur={formik.handleBlur}
  fullWidth
/>
</>

      )
    }
   
{
  isSignUp?(
    <Button
    disabled={isLoading}
    color="primary"
    sx={{ marginTop: "6px", borderRadius: "3", px: 3, py: 1.2 }}
    type="submit"
    variant="contained"
  >
    {t("Sign Up")}
  </Button>
  ):(
    <Button
    disabled={isLoading}
    color="primary"
    sx={{ marginTop: "6px", borderRadius: "3", px: 3, py: 1.2 }}
    type="submit"
    variant="contained"
  >
    {t("Login")}
  </Button>
  )
}
 
        <Box sx={{ marginTop: 1, borderRadius: 3 }}>
         {isSignUp?"have an account":"Don't have an account?"}
          <Button
            onClick={() => setIsSignUp(!isSignUp)}
            variant="text"
            color="warning"
          >
          {
            isSignUp?t("Login"): 'SIGN UP'
          }
           
          </Button>{" "}
        </Box>
      </Box>
      {isLoading && <LoadingSpinner />}
      <ToastContainer />
    </form>
  );
};

export default Login;
