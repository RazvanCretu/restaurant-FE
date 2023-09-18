import { redirect } from "next/navigation";
import { getCookie } from "@/lib/actions/cookies";
import { Suspense } from "react";

export const revalidate = 5;

const Loading = () => <>Loading...</>;

export default async function Layout({ children }) {
  const token = await getCookie("token");

  if (token) {
    return <Suspense fallback={<Loading />}>{children}</Suspense>;
  }

  redirect("/login");
}
