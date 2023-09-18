// import "./globals.css";
import ThemeRegistry from "@/lib/theme/ThemeRegistry";
import { ApolloWrapper } from "@/lib/apollo/Provider";
import { Container } from "@mui/material";
import Bar from "@/components/Navigation/Bar";
import Auth from "@/lib/contexts/Authentication";
import Logout from "@/components/Navigation/LogoutButton";
import { getUser } from "@/lib/actions/user";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const user = await getUser();
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <ThemeRegistry options={{ key: "mui" }}>
            <Auth userData={user}>
              <Bar />
              <Container component="main">{children}</Container>
              <Logout />
            </Auth>
          </ThemeRegistry>
        </ApolloWrapper>
      </body>
    </html>
  );
}
