import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { login, register } from "../../reduxToolkit/slices/authSlice";
import notify from "../../components/shared/useNotification";
import { useNavigate } from "react-router-dom";

const LoginHook = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // navigate to dashboard if user logged
  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [navigate, user]);
  //initail values of form
  const initialValues = {
    email: "",
    password: "",
    mobile: "",
    firstName: "",
    lastName: "",
    national_id: "",
  };

  //validate login schema form email , password using YUP
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("Email is required"))
      .email("Not a Valid email"),
    password: Yup.string()
      .required(t("Password is required"))
      .min(3, t("Passsword should have at least 3 character")),
  });

  //validate register shema using YUP
  const validationRegisterSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("Email is required"))
      .email("Not a Valid email"),
    password: Yup.string()
      .required(t("Password is required"))
      .min(3, t("Passsword should have at least 3 character")),
    firstName: Yup.string().required(t("first Name is required")),
    lastName: Yup.string().required(t("last Name is required")),
    mobile: Yup.string().required(t("Phone Number is required")),
    national_id: Yup.string().required(t("national id is required")),
  });

  //Handle on Submit Form
  const onSubmit = async (values) => {
    console.log(values);
    setIsLoading(true);
    if (isSignUp) {
      await dispatch(
        register({
          email: values.email,
          password: values.password,
          mobile: values.mobile,
          firstName: values.firstName,
          lastName: values.lastName,
          national_id: values.national_id,
        })
      );
    } else {
      await dispatch(login({ email: values.email, password: values.password }));
    }
    setIsLoading(false);
  };

  // create formik using useFormik to handle form
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: isSignUp ? validationRegisterSchema : validationSchema,
  });

  // response of login
  const loginResponse = useSelector((state) => state.auth.login);
  const registerResponse = useSelector((state) => state.auth.signUp);
  useEffect(() => {
    if (isSignUp) {
      if (registerResponse && isLoading === false) {
        if (registerResponse.message === "User registered successfully") {
          notify(t(" account registered successfully"), "success");
          setTimeout(() => {
          return  window.location.href = "/login";
          }, 1000);
        } else if (registerResponse.status === 400)
        return notify(t("Email already exists"), "error");  
      }
    } else {
      if (loginResponse && isLoading === false) {
        if (loginResponse.token) {
          localStorage.setItem("token", loginResponse.token);
          localStorage.setItem("user", JSON.stringify(loginResponse));
          notify(t("Logged in successfully"), "success");
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
        if (loginResponse.status === 404)
          return notify(t("The email is incorrect"), "error");
        if (loginResponse.status === 401)
          return notify(t("The password is incorrect"), "error");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginResponse, isLoading]);

  return [formik, isLoading, isSignUp, setIsSignUp];
};

export default LoginHook;
