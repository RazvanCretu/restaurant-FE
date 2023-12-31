// import "./globals.css";
import ThemeRegistry from "@/lib/theme/ThemeRegistry";
import { ApolloWrapper } from "@/lib/apollo/Provider";
import { Container } from "@mui/material";
import Bar from "@/components/Navigation/Bar";
import Auth from "@/lib/contexts/Authentication";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <ThemeRegistry options={{ key: "mui" }}>
            <Auth>
              <Bar />
              <Container component="main">{children}</Container>
            </Auth>
          </ThemeRegistry>
        </ApolloWrapper>
      </body>
    </html>
  );
}
