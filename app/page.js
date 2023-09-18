import Link from "@/components/Navigation/Link";
import { Fragment } from "react";
import { getClient } from "@/lib/apollo/client";
import { Box, Button, Card, Typography } from "@mui/material";
import { PRODUCTS } from "@/lib/queries/product";

export const revalidate = 5;

export default async function Home() {
  const { data } = await getClient().query({
    query: PRODUCTS,
  });

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
      </div>
    </Fragment>
  );
}
