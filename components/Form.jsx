"use client";

import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { redirect, useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/Authentication";
import { loginUser } from "@/lib/actions/user";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const LoginForm = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "test@gmail.com",
      password: "test1234",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      handleLogin();
    },
  });
  const { setUser } = useAuth();

  const handleLogin = async () => {
    const user = await loginUser(formik.values.email, formik.values.password);

    if (user) {
      router.replace("/dashboard");
      setUser(user);
      // redirect("/dashboard", "replace");
    }
  };

  return (
    <form action={formik.handleSubmit}>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;
