"use client";

import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/Authentication";
import { setCookie } from "@/lib/actions/cookies";
import { loginUser } from "@/lib/actions/user";
import { LOGIN } from "@/lib/queries/user";

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
  const { setUser } = useAuth();
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
  const [login, { error, loading, reset }] = useMutation(LOGIN, {
    variables: {
      input: {
        identifier: formik.values.email,
        password: formik.values.password,
        provider: "local",
      },
    },
  });

  const handleLogin = async () => {
    // const { data } = await login();
    await loginUser(formik.values.email, formik.values.password);
    // console.log(data);
    // if (data) {
    //   //   window.localStorage.setItem("token", data.login.jwt);
    //   //   console.log(data.login.user);
    //   setUser(data.login.user);
    //   //   setCookie("token", data.login.jwt);
    //   //   router.push("/dashboard");
    // }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      //   action={loginUser}
    >
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
