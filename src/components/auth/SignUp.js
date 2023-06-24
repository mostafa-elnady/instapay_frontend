import { useTranslation } from "react-i18next";
import SignUpHook from "../../hook/auth/SignUpHook";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import LoadingSpinner from "../shared/LoadingSpinner";
import { ToastContainer } from "react-toastify";

const SignUp = () => {
    const [formik, isLoading] = SignUpHook();
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <form onSubmit={formik.handleSubmit}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          maxWidth={400}
          margin={"auto"}
          marginTop={10}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{ ":hover": { boxShadow: "10px 10px 20px #ccc" } }}
        >
          <Typography variant="h2" padding={3} textAlign={"center"}>
            {t("Login")}
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
          <TextField
            margin="normal"
            name="mobile"
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

          <Button
            disabled={isLoading}
            color="primary"
            sx={{ marginTop: "6px", borderRadius: "3", px: 3, py: 1.2 }}
            type="submit"
            variant="contained"
          >
            {t("Login")}
          </Button>
          <Box sx={{ marginTop: 2, borderRadius: 3 }}>
            have an account?{" "}
            <Button
              onClick={() => navigate("/login")}
              variant="text"
              color="warning"
            >
            {t("Login")}
            </Button>{" "}
          </Box>
        </Box>
        {isLoading && <LoadingSpinner />}
        <ToastContainer />
      </form>
    )

}

export default SignUp
