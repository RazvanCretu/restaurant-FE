"use server";

import { cookies } from "next/headers";

export async function setCookie(name, value, opts) {
  cookies().set(name, value, opts);
}

export async function getCookie(name) {
  return cookies().get(name)?.value;
}

export async function removeCookie(name) {
  cookies().delete(name);
}
