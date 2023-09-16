import Image from "next/image";
import { Fragment } from "react";
import { getClient } from "@/lib/apollo/client";
import { gql } from "@apollo/client";

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
        <pre>
          <code>{data && JSON.stringify(data, null, 4)}</code>
        </pre>
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
