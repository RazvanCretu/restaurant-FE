"use server";

import { getClient } from "@/lib/apollo/client";
import { LOGIN, ME } from "@/lib/queries/user";
import { removeCookie, setCookie, getCookie } from "./cookies";
import { redirect } from "next/navigation";

export async function loginUser(email, password) {
  const { data, error } = await getClient().mutate({
    mutation: LOGIN,
    variables: {
      input: {
        identifier: email,
        password: password,
        provider: "local",
      },
    },
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
  });

  // console.log(data, error);
  setCookie("token", data.login.jwt);
  return data.login.user;
  // redirect("/dashboard");
}

export async function logoutUser() {
  removeCookie("token");
  // console.log("Runned");
  // redirect("/login");
  // connected = false;
}

export async function getUser() {
  const token = await getCookie("token");
  console.log(token, "FROM getUser SERVER ACTION");

  if (token) {
    const { data, error } = await getClient().query({
      query: ME,
      context: { headers: { authorization: `Bearer ${token}` } },
    });

    console.log(data);

    return data.me;
  }

  return null;
}

// export async function connectUser() {
//   connected = !connected;
// }
