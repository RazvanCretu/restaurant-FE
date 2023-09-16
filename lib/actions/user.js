"use server";

import { getClient } from "@/lib/apollo/client";
import { LOGIN } from "@/lib/queries/user";
import { redirect } from "next/navigation";
import { removeCookie, setCookie } from "./cookies";
import { ME } from "@/lib/queries/user";

export async function loginUser(email, password) {
  const { data, error } = await getClient().mutate({
    mutation: LOGIN,
    variables: {
      input: {
        // identifier: formData.get("email"),
        identifier: email,
        // password: formData.get("password"),
        password: password,
        provider: "local",
      },
    },
  });

  // console.log(data, error);
  setCookie("token", data.login.jwt);
  redirect("/dashboard");
  // return data.login.user;
}

export async function logoutUser() {
  removeCookie("token");
  redirect("/login");
}

export async function getUser(token) {
  //   const token = await getCookie("token");
  console.log(token, "FROM Protected");

  if (token) {
    const { data } = await getClient().query({
      query: ME,
      context: { headers: { authorization: `Bearer ${token}` } },
    });

    return data.me;
  }
}
