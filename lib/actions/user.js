"use server";

import { getClient } from "@/lib/apollo/client";
import { LOGIN, ME } from "@/lib/queries/user";
import { removeCookie, setCookie, getCookie } from "./cookies";

export async function loginUser(email, password) {
  const { data } = await getClient().mutate({
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

  setCookie("token", data.login.jwt, { maxAge: 24 * 60 * 60 });
  return data.login.user;
}

export async function logoutUser() {
  await removeCookie("token");
}

export async function getUser() {
  const token = await getCookie("token");
  console.log(token, "FROM getUser SERVER ACTION");

  if (token) {
    const { data } = await getClient().query({
      query: ME,
      context: { headers: { authorization: `Bearer ${token}` } },
    });

    return data.me;
  }

  return null;
}
