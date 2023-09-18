import Image from "next/image";
import Link from "@/components/Navigation/Link";
import { Fragment, cache } from "react";
import { getClient } from "@/lib/apollo/client";
import { Box, Button, Card, Typography } from "@mui/material";
import { PRODUCTS } from "@/lib/queries/product";

const getProducts = cache(async () => {
  const { data, error, loading } = await getClient().query({
    query: PRODUCTS,
    context: {
      fetchOptions: {
        cache: "no-store",
      },
    },
  });

  return { data, error, loading };
});

export const revalidate = 5;

export default async function Home() {
  const { data, error, loading } = await getClient().query({
    query: PRODUCTS,
  });

  // const { data, error, loading } = getProducts();

  if (error) {
    return JSON.stringify(error);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // console.log("rerender");

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
                <Button href={`/shop/${product.id}`} component={Link}>
                  See
                </Button>
              </Card>
            );
          })}
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
