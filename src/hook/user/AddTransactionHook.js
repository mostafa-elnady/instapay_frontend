import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllUsers,
  addUserTransaction,
} from "../../reduxToolkit/slices/walletSlice";
import notify from "../../components/shared/useNotification";

const AddTransactionHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const usersResponse = useSelector((state) => state.wallet.allUsers);

  useEffect(() => {
    if (usersResponse && usersResponse.length !== 0) {
      setUsers(usersResponse.filter(el=>el.id !== user.id));
    }
  }, [user.id, usersResponse]);

  const initialValues = {
    money: "",
    user_id_trensfered: "",
  };

  const validationSchema = Yup.object().shape({
    money: Yup.number()
      .required("money is required ")
      .positive("money must be a positive number "),
    user_id_trensfered: Yup.string().required("Select User"),
  });

  const onSubmit = async (values, { resetForm }) => {
    console.log("values");
    console.log(values);
    await dispatch(
      addUserTransaction({
        user_id_transfer: user.id,
        user_id_trensfered: values.user_id_trensfered,
        money: values.money,
      })
    );

    setLoading(false);

    resetForm();
  };

  const addTransactionResponse = useSelector(
    (state) => state.wallet.addTransaction
  );

  useEffect(() => {
    if (loading === false) {
      if (addTransactionResponse) {
        //   console.log('addTransactionResponse')
        //   console.log(addTransactionResponse)
        notify(" Add Transaction Successfully  ", "success");
        setTimeout(() => {
          navigate("/transactions");
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, addTransactionResponse]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return [formik, users];
};

export default AddTransactionHook;
