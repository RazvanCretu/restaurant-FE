import { getClient } from "@/lib/apollo/client";
import { PRODUCTS } from "@/lib/queries/product";

export async function generateStaticParams() {
  const { data } = await getClient().query({
    query: PRODUCTS,
  });

  return data.products.data.map((product) => ({
    id: product.id,
  }));
}

export default function Item({ params }) {
  return <div>My Post: {params.id}</div>;
}
