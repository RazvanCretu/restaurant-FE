import ProtectedLayout from "@/components/Protected";
import { redirect } from "next/navigation";
import { getCookie } from "@/lib/actions/cookies";
import { getUser } from "@/lib/actions/user";

export default async function Layout({ children }) {
  // MAYBE DO SERVER FETCHING FOR AUTH HERE AND PASS DOWN TO PROTECTED LAYOUT???
  // NOW IT"S CLIENT SIDE PROTECTED

  const token = await getCookie("token");
  //   const me = await getUser(token);

  if (token) {
    return (
      <ProtectedLayout
        //   user={me}
        token={token}
      >
        {children}
      </ProtectedLayout>
    );
  }

  redirect("/login");
}
