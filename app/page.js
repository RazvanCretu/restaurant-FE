import Image from "next/image";
import { Fragment } from "react";
import { getClient } from "@/lib/apollo/client";
import { gql } from "@apollo/client";
import { Box, Button, Card, Typography } from "@mui/material";
import Link from "@/components/Navigation/Link";

const PRODUCTS = gql`
  query Products {
    products {
      data {
        id
        attributes {
          name
          description
          price
        }
      }
    }
  }
`;

export default async function Home() {
  const { data, error, loading } = await getClient().query({
    query: PRODUCTS,
  });

  if (error) {
    return JSON.stringify(error);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <div>
        {data &&
          data.products.data.map((product, index, arr) => {
            return (
              <Card
                sx={{
                  marginTop: "1rem",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: "1rem 3rem",
                }}
                key={index}
              >
                <Box>
                  <Typography variant="h4">
                    {product.attributes.name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {product.attributes.description}
                  </Typography>
                </Box>
                <Button href={`/item/${product.id}`} component={Link}>
                  See
                </Button>
              </Card>
            );
          })}
        {/* <pre>
          <code>{data && JSON.stringify(data.products.data, null, 4)}</code>
        </pre> */}
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div>
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </Fragment>
  );
}
