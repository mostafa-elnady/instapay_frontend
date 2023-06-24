import { Autocomplete, Box, Button, Container, TextField } from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";
import AddTransactionHook from "../../hook/user/AddTransactionHook";
const AddTransaction = () => {
  const [formik, users] = AddTransactionHook();

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <h2> Add Transaction</h2>

        <Autocomplete
          id="user_id_trensfered"
          name="user_id_trensfered"
          options={users}
          value={formik.values.id}
          getOptionLabel={(option) => option.firstName}
          onChange={(event, value) => {
            formik.setFieldValue("user_id_trensfered", value.id);
          }}
          onBlur={formik.handleBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select user"
              margin="normal"
              variant="outlined"
              error={
                formik.touched.user_id_trensfered &&
                Boolean(formik.errors.user_id_trensfered)
              }
              helperText={
                formik.touched.user_id_trensfered &&
                formik.errors.user_id_trensfered
              }
            />
          )}
        />

        <TextField
          label="money"
          name="money"
          type="number"
          value={formik.values.money}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.money && Boolean(formik.errors.money)}
          helperText={formik.touched.money && formik.errors.money}
          margin="normal"
          variant="outlined"
          fullWidth
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "end" },
            mt: 5,
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ px: 3, py: 1.2 }}
          >
            Save
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </Container>
  );
};

export default AddTransaction;
